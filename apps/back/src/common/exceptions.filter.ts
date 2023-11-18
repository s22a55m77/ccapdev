import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import {
  BadRequestException,
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
    if (
      exception instanceof BadRequestException &&
      // @ts-ignore
      exception.getResponse().message instanceof Array
    ) {
      // @ts-ignore
      response.status(status).json(
        ResponseVo.error(
          // @ts-ignore
          exception.getResponse().error,
          // @ts-ignore
          exception.getResponse().message[0],
        ),
      );
    } else {
      response
        // @ts-ignore
        .status(status)
        .json(ResponseVo.error(exception.name, exception.message));
    }
  }
}
