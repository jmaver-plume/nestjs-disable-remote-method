import {
  Controller,
  Get,
  NotImplementedException,
  Post,
  Put,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DisableEndpointService } from '../disable-endpoint/disable-endpoint.service';

@Controller('resources')
export class ResourceController {
  constructor(
    private readonly configService: ConfigService,
    private readonly disableEndpointService: DisableEndpointService,
  ) {}

  onCustomModuleInit() {
    const featureFlags = this.configService.get('featureFlags');
    if (!featureFlags.enableFindById) {
      this.disableEndpointService.disable(this.findById);
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
