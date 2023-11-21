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

    const token = await this.authService.createAccessToken({
      userId: user.id,
      role: user.role,
    });
    return ResponseVo.success({ token });
  }

  // POST /auth/register
  @Post('register')
  @UseGuards(LocalGuard)
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ResponseVo<RegisterVo>> {
    const user = new UserEntity();
    user.role = RoleType.USER;
    user.username = registerDto.username;
    user.email = registerDto.email;
    // TODO encrypt password using bcrypt

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(registerDto.password, salt);
    user.password = hashedPassword;

    const insertedUser: UserEntity = await this.userService
      .insertUser(user)
      .catch((e) => {
        if (e.constraint === 'UQ_78a916df40e02a9deb1c4b75edb')
          throw new ConflictException('User already exist');
        else throw new InternalServerErrorException();
      });

    const token = await this.authService.createAccessToken({
      userId: insertedUser.id,
      role: user.role,
    });

    return ResponseVo.success({ token });
  }

  // POST /auth/logout
  @UseGuards(LocalGuard)
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

  //GET /auth/refresh
  // @Get('refresh')
  // @Auth([RoleType.USER, RoleType.ADMIN])
  // async refreshToken(
  //   @AuthUser() user: UserEntity,
  //   @Req() req,
  // ): Promise<ResponseVo<RefreshTokenVo>> {
  //   if (req.session.cookie.originalMaxAge) {
  //     const day = 21 * 24 * 60 * 60 * 1000;
  //     req.session.cookie.expires = new Date(Date.now() + day);
  //     req.session.cookie.maxAge = day;
  //   }
  //   req.session.save();
  //
  //   const newToken = await this.authService.createAccessToken({
  //     userId: user.id,
  //     role: user.role,
  //   });
  //
  //   return ResponseVo.success({ token: newToken });
  // }
}
