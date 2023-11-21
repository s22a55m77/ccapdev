// modified from https://github.com/NarHakobyan/awesome-nest-boilerplate/blob/main/src/guards/roles.guard.ts#L1C1-L17C2
import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType, UserEntity } from '../../model/user.entity';
import { setValue } from 'express-ctx';
import { LoggedInGuard } from './logged-in-guard.guard';

@Injectable()
export class RolesGuard implements LoggedInGuard {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleType[]>(
      'roles',
      context.getHandler(),
    );

    if (roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = <UserEntity>request.session.passport.user;
    setValue('user', user);

    return roles.includes(user.role);
  }
}
