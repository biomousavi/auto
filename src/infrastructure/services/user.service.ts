import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../persistence/entities/user.entity';
import { EncryptionService } from './encryption.service';
import { SignUpDto } from 'src/api/dtos/sign-up.dto';
import { UserRepository } from 'src/persistence/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async signUp({ username, password }: SignUpDto): Promise<{ token: string }> {
    // Check for existing user
    const existingUser = await this.userRepository.findOne({ username });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Encrypt password
    const { encryptedData: encryptedPassword, iv: passwordIv } = this.encryptionService.encrypt(password);

    // Create and save user
    const user = await this.userRepository.create({
      username,
      passwordIv,
      password: encryptedPassword,
    });

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: user.id,
      username: user.username,
      // get time by seconds from seconds
      iat: Math.floor(Date.now() / 1000),
    });

    return { token };
  }

  async decryptUserPassword(user: User): Promise<string> {
    return this.encryptionService.decrypt(user.password, user.passwordIv);
  }
}
