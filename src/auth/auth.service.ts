import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async login(username: string, password: string) {
    if (password !== 'admin') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roles = username === 'admin' ? [Role.Admin] : [Role.User];

    const payload = {
      sub: 'mock-user-id',
      username,
      roles,
    };

    return {
      accessToken: await this.jwt.signAsync(payload),
    };
  }
}