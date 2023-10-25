import {
  createParamDecorator,
  type ExecutionContext,
} from '@nestjs/common';
import { getValue } from 'express-ctx';

export function AuthUser() {
  return createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
      return getValue('user');
    },
  )();
}
