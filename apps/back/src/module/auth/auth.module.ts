// modified from https://github.com/NarHakobyan/awesome-nest-boilerplate/blob/main/src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../model/user.entity';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { CommentEntity } from '../../model/comment.entity';
import { RestroomEntity } from '../../model/restroom.entity';
import { RestroomService } from '../restroom/restroom.service';
import { EntitiesModule } from '../entity/entities.module';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [
    EntitiesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get<string>('JWT_PRIVATE_KEY'),
        publicKey: configService.get<string>('JWT_PUBLIC_KEY'),
        signOptions: {
          algorithm: 'ES256',
          expiresIn: configService.get<number>('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    RestroomService,
    CommentService,
  ],
})
export class AuthModule {}
