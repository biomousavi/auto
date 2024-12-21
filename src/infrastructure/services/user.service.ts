import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../persistence/repositories/user.repository';
import { EncryptionService } from './encryption.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async createUser() {}

  async getUserById() {}
}
