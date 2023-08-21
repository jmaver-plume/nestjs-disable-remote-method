import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DisableEndpointGuard } from './disable-endpoint.guard';
import { DisableEndpointService } from './disable-endpoint.service';

@Global()
@Module({
  providers: [
    {
      provide: APP_GUARD, // Make the Guard global
      useClass: DisableEndpointGuard,
    },
    DisableEndpointService,
  ],
  exports: [DisableEndpointService],
})
export class DisableEndpointModule {}
