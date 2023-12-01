import {
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ResponseVo } from '../../common/response.vo';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RoleType, UserEntity } from '../../model/user.entity';
import { Auth } from './auth';
import { AuthUser } from './auth-user';
import { LoginVo } from './vo/login.vo';
import { RegisterVo } from './vo/register.vo';
import { MeVo } from './vo/me.vo';
import { RefreshTokenVo } from './vo/refresh-token.vo';
import * as bcrypt from 'bcrypt';
import { LocalGuard } from './local.guard';
import { LoggedInGuard } from './logged-in-guard.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // POST /auth/login
  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req,
  ): Promise<ResponseVo<LoginVo>> {
    const user = await this.authService.validateUser(loginDto);

    if (loginDto.rememberMe) {
      const day = 21 * 24 * 60 * 60 * 1000;
      req.session.cookie.expires = new Date(Date.now() + day);
      req.session.cookie.maxAge = day;
    }

    req.session.save();

    return ResponseVo.success({ success: true });
  }

  // POST /auth/register
  // @UseGuards(LocalGuard)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ResponseVo<RegisterVo>> {
    const user = new UserEntity();
    user.role = RoleType.USER;
    user.username = registerDto.username;
    user.email = registerDto.email;

    // encrypt password using bcrypt
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(registerDto.password, salt);
    user.password = hashedPassword;

    const insertedUser: UserEntity = await this.userService
      .insertUser(user)
      .catch((e) => {
        if (e.constraint === 'UQ_78a916df40e02a9deb1c4b75edb')
          throw new ConflictException('User already exist');
        if (e.constraint === 'UQ_e12875dfb3b1d92d7d7c5377e22')
          throw new ConflictException('Email already exist');
        else throw new InternalServerErrorException();
      });

    return ResponseVo.success({ success: true });
  }

  // POST /auth/logout
  // @UseGuards(LocalGuard)
  @Post('logout')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async logout(@Req() req) {
    req.session.destroy();
    return ResponseVo.success({ success: true });
  }

  // GET /auth/me
  @Get('me')
  // @UseGuards(LoggedInGuard)
  @Auth([RoleType.USER, RoleType.ADMIN])
  me(@AuthUser() user: UserEntity) {
    return ResponseVo.success({ ...user });
  }
}
