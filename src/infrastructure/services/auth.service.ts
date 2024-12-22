import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  sub: number;
  username: string;
  iat: number;
}
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getJwtToken(id: number, username: string) {
    const payload: JwtPayload = {
      sub: id,
      username,
      iat: Math.floor(Date.now() / 1000),
    };

    return this.jwtService.sign(payload);
  }

  async verifyJwtToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync<JwtPayload>(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Token is not valid.');
    }
  }
}
