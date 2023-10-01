import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

import { ITokens, IJwtPayload } from '../types';
import { ApplicationConfigInterface } from 'src/config';

@Injectable()
export class JwtService {
  private readonly jwtSecret: string;

  constructor(
    private readonly config: ConfigService<ApplicationConfigInterface>,
  ) {
    this.jwtSecret = this.config.get<string>('JWT_SECRET');
  }

  generateTokens(payload: IJwtPayload): ITokens {
    const accessToken = sign(payload, this.jwtSecret, {
      expiresIn: 10,
    });

    const refreshToken = sign(payload, this.jwtSecret, {
      expiresIn: 1000 * 10 * 6,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyToken(token: string) {
    try {
      return verify(token, this.jwtSecret);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
