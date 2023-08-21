import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { DECORATORS } from '@nestjs/swagger/dist/constants';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const apiExcludeEndpoint = this.reflector.get<{ disable: boolean }>(
      DECORATORS.API_EXCLUDE_ENDPOINT,
      context.getHandler(),
    );

    if (apiExcludeEndpoint && apiExcludeEndpoint.disable) {
      throw new NotFoundException();
    }

    return next.handle();
  }
}
