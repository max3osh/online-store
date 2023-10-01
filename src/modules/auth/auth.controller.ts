import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './services';
import { AuthUserReqDto } from './dto/req';
import { LoginResDto, UserResDto } from './dto/res';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('check')
  async checkAuth(@Headers('authorization') token: string) {
    console.log(token);

    return await this.authService.checkAuth(token);
  }

  @Post('register')
  async registerUser(@Body() body: AuthUserReqDto): Promise<UserResDto> {
    return await this.authService.registerUser(body);
  }

  @Post('login')
  async loginUser(@Body() body: AuthUserReqDto): Promise<LoginResDto> {
    return await this.authService.loginUser(body);
  }
}
