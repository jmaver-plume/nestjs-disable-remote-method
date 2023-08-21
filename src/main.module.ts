import { Module } from '@nestjs/common';
import { ResourceModule } from './resource/resource.module';
import { ConfigModule } from '@nestjs/config';
import { CustomLifecycleModule } from './custom-lifecycle/custom-lifecycle.module';
import { DisableEndpointModule } from './disable-endpoint/disable-endpoint.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          featureFlags: {
            enableFindById:
              process.env.FEATURE_FLAG_ENABLE_FIND_BY_ID === 'true',
          },
        }),
      ],
    }),
    DisableEndpointModule,
    CustomLifecycleModule,
    ResourceModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
