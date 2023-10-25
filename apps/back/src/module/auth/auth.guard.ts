import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// export function AuthGuard(): Type<IAuthGuard> {
//   const strategies = ['jwt'];
//   console.log('Auth Guard');
//   return NestAuthGuard(strategies);
// }

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {}
