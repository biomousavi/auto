import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async getJwtToken(id: number, username: string) {
    return this.jwtService.sign({
      sub: id,
      username: username,
      // get time by seconds from seconds
      iat: Math.floor(Date.now() / 1000),
    });
  }
}
