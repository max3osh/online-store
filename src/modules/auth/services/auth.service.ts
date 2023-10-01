import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from 'src/db/entities/user.entity';
import { JwtService } from './jwt.service';
import { AuthUserReqDto } from './../dto/req';
import { LoginResDto } from '../dto/res';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  public async checkAuth(token: string) {
    return this.jwtService.verifyToken(token);
  }

  public async registerUser(params: AuthUserReqDto): Promise<UserEntity> {
    return await this.userRepository.save(params);
  }

  public async loginUser(params: AuthUserReqDto): Promise<LoginResDto> {
    const user = await this.userRepository.findOne({
      where: {
        username: params.username,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${params.username} not found`);
    }

    if (params.password !== user.password) {
      throw new BadRequestException(`Wrong password`);
    }

    return this.jwtService.generateTokens({
      username: user.username,
      role: user.role,
    });
  }
}
