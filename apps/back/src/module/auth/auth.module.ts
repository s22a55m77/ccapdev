// modified from https://github.com/NarHakobyan/awesome-nest-boilerplate/blob/main/src/modules/auth/auth.module.ts
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { RestroomService } from '../restroom/restroom.service';
import { EntitiesModule } from '../entity/entities.module';
import { CommentService } from '../comment/comment.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthValidationMiddleware } from './authValidationMiddleWare';

@Module({
  imports: [
    EntitiesModule,
    PassportModule.register({ defaultStrategy: 'local' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    RestroomService,
    CommentService,
    SessionSerializer,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthValidationMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
