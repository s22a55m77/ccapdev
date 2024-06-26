import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const isAuthenticated = context
      .switchToHttp()
      .getRequest()
      .isAuthenticated();

    if (!isAuthenticated) throw new UnauthorizedException();

    return isAuthenticated;
  }
}
