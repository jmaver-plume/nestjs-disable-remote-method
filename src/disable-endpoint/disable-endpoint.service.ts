import { Injectable } from '@nestjs/common';
import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { DISABLE_ENDPOINT_METADATA_KEY } from './disable-endpoint.constants';

@Injectable()
export class DisableEndpointService {
  disable(endpointMethod: (...any: []) => void) {
    Reflect.defineMetadata(
      DECORATORS.API_EXCLUDE_ENDPOINT,
      { disable: true },
      endpointMethod,
    );
    Reflect.defineMetadata(
      DISABLE_ENDPOINT_METADATA_KEY,
      { disable: true },
      endpointMethod,
    );
  }
}
