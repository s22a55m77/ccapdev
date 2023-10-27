import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ResponseVo } from '../../common/response.vo';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RoleType, UserEntity } from '../../model/user.entity';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from './auth.guard';
import { Auth } from './auth';
import { AuthUser } from './auth-user';
import { LoginVo } from './vo/login.vo';
import { RegisterVo } from './vo/register.vo';
import { MeVo } from './vo/me.vo';
import { RefreshTokenVo } from './vo/refresh-token.vo';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // POST /auth/login
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseVo<LoginVo>> {
    const user = await this.authService.validateUser(loginDto);
    const token = await this.authService.createAccessToken({
      userId: user.id,
      role: user.role,
    });
    return ResponseVo.success({ token });
  }

  // POST /auth/register
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ResponseVo<RegisterVo>> {
    const user = new UserEntity();
    user.role = RoleType.USER;
    user.username = registerDto.username;
    user.email = registerDto.email;
    user.password = registerDto.password;

    // TODO 重复注册 unique constraint报错
    const insertedUser: UserEntity = await this.userService.insertUser(
      user,
    );

    const token = await this.authService.createAccessToken({
      userId: insertedUser.id,
      role: user.role,
    });

    return ResponseVo.success({ token });
  }

  // GET /auth/me
  @Get('me')
  @Auth([RoleType.USER, RoleType.ADMIN])
  me(@AuthUser() user: UserEntity) {
    return ResponseVo.success({ user });
  }

  // TODO 通过@Auth的话就返回新的token
  //GET /auth/refresh
  @Get('refresh')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async refreshToken(
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<RefreshTokenVo>> {
    const newToken = await this.authService.createAccessToken({
      userId: user.id,
      role: user.role,
    });

    return ResponseVo.success({ token: newToken });
  }
}
