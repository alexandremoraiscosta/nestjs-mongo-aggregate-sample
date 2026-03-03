import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async login(username: string, password: string) {
    if (username !== 'admin' || password !== 'admin') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: 'mock-user-id',
      username,
      roles: ['admin'],
    };

    return {
      accessToken: await this.jwt.signAsync(payload),
    };
  }
}