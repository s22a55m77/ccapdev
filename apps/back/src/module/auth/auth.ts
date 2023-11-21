// modified from https://github.com/NarHakobyan/awesome-nest-boilerplate/blob/main/src/decorators/http.decorators.ts

import { RoleType } from '../../model/user.entity';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { LoggedInGuard } from './logged-in-guard.guard';

export function Auth(roles: RoleType[] = []): MethodDecorator {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(LoggedInGuard, RolesGuard),
  );
}
