// modified from https://github.com/NarHakobyan/awesome-nest-boilerplate/blob/main/src/modules/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { RoleType, UserEntity } from '../../model/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_PUBLIC_KEY'),
    });
  }

  async validate(args: {
    userId: number;
    role: RoleType;
  }): Promise<UserEntity> {
    const user = await this.userService.getUserById(args.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
