import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ResponseVo } from '../../common/response.vo';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // POST /auth/login
  @Post('login')
  login() {}

  // POST /auth/register
  @Post('register')
  register() {}

  // GET /auth/me
  @Get('me')
  me() {
    const user = this.userService.getUserById(1);
    return ResponseVo.success(user);
  }
}
