import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResDto } from './dto/res';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Get()
  async getUsers(): Promise<UserResDto[]> {
    return await this.authService.getUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserResDto> {
    return await this.authService.getUserById(id);
  }
}
