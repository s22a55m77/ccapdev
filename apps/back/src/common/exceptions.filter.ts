import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import {
  Catch,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseVo } from './response.vo';

@Catch(HttpException)
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      // @ts-ignore
      .status(status)
      .json(ResponseVo.error(exception.name, exception.message));
  }
}
