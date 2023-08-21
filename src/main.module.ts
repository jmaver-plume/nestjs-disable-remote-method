import { Module } from '@nestjs/common';
import { ResourceModule } from './resource/resource.module';
import { ConfigModule } from '@nestjs/config';
import { CustomLifecycleModule } from './custom-lifecycle/custom-lifecycle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          featureFlags: {
            enableFindById: false,
          },
        }),
      ],
    }),
    CustomLifecycleModule,
    ResourceModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
