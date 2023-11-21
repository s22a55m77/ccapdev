// modified from https://github.com/NarHakobyan/awesome-nest-boilerplate/blob/main/src/modules/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { RoleType, UserEntity } from '../../model/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_PUBLIC_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    args: {
      userId: number;
      role: RoleType;
    },
  ): Promise<UserEntity> {
    const accessToken = request.headers['authorization'].replace(
      'Bearer ',
      '',
    );
    const valid = this.authService.validateToken(args.userId, accessToken);

    if (!valid) {
      throw new UnauthorizedException('Token is expired or invalid');
    }

    const user = await this.userService.getUserById(args.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
