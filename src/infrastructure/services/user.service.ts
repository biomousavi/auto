import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../../persistence/entities/user.entity';
import { EncryptionService } from './encryption.service';
import { SignUpDto } from 'src/api/dtos/sign-up.dto';
import { UserRepository } from 'src/persistence/repositories/user.repository';
import { AuthService } from './auth.service';
// import { UserProfileDto } from 'src/api/dtos/user-profile.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
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
    const token = await this.authService.getJwtToken(user.id, user.username);

    return { token };
  }
  async getUserProfile(userId: number) {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) throw new NotFoundException('User not found');

    const decryptedPassword = this.encryptionService.decrypt(user.password, user.passwordIv);

    return {
      username: user.username,
      password: decryptedPassword,
    };
  }

  async decryptUserPassword(user: User): Promise<string> {
    return this.encryptionService.decrypt(user.password, user.passwordIv);
  }
}
