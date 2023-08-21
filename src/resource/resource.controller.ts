import {
  Controller,
  Get,
  NotImplementedException,
  Post,
  Put,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DECORATORS } from '@nestjs/swagger/dist/constants';

function disableEndpointMethod(endpointMethod: (...any: []) => void) {
  Reflect.defineMetadata(
    DECORATORS.API_EXCLUDE_ENDPOINT,
    { disable: true },
    endpointMethod,
  );
}

@Controller('resources')
export class ResourceController {
  constructor(private readonly configService: ConfigService) {}

  onCustomModuleInit() {
    const featureFlags = this.configService.get('featureFlags');
    if (!featureFlags.enableFindById) {
      disableEndpointMethod(this.findById);
    }
  }

  @Get()
  findAll() {
    throw new NotImplementedException();
  }

  @Post()
  create() {
    throw new NotImplementedException();
  }

  @Get(':id')
  findById() {
    throw new NotImplementedException();
  }

  @Put(':id')
  replaceById() {
    throw new NotImplementedException();
  }
}
