import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { setValue } from 'express-ctx';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    let token = context.switchToHttp().getRequest().headers?.authorization;
    if (token) {
      token = token.replaceAll('Bearer ', '');
      let decoded = this.jwtService.decode(token) as Record<string, any>;
      const user = this.userService.getUserById(decoded.userId);
      setValue('user', user);
    }

    return next.handle();
  }
}
