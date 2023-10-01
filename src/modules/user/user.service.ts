import { Injectable } from '@nestjs/common';
// import { UpdateUserReqDto } from './dto/req';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      // select: {
      //   username: true,
      //   role: true,
      // },
    });
  }

  public async getUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }
}
