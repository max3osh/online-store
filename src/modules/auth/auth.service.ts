import { Injectable } from '@nestjs/common';
import { RegUserReqDto } from './dto/req';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async registerUser(params: RegUserReqDto): Promise<UserEntity> {
    return await this.userRepository.save(params);
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
