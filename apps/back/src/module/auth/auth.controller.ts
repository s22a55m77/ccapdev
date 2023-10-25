import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ResponseVo } from '../../common/response.vo';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // POST /auth/login
  @Post('login')
  login(@Body() loginDto: LoginDto) {}

  // POST /auth/register
  @Post('register')
  register(@Body() registerDto: RegisterDto) {}

  // GET /auth/me
  @Get('me')
  me() {
    const user = this.userService.getUserById(1);
    return ResponseVo.success(user);
  }

  //GET /auth/refresh
  @Get('refresh')
  refreshToken() {}
}
