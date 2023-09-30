import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegUserReqDto } from './dto/req';
import { RegUserResDto } from './dto/res';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() body: RegUserReqDto): Promise<RegUserResDto> {
    return await this.authService.registerUser(body);
  }

  @Get('users')
  async getUsers(): Promise<RegUserResDto[]> {
    return await this.authService.getUsers();
  }
}
