import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { DISABLE_ENDPOINT_METADATA_KEY } from './disable-endpoint.constants';

@Injectable()
export class DisableEndpointGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const disableEndpoint = this.reflector.get<{ disable: boolean }>(
      DISABLE_ENDPOINT_METADATA_KEY,
      context.getHandler(),
    );

    if (disableEndpoint && disableEndpoint.disable) {
      throw new NotFoundException();
    }

    return true;
  }
}
