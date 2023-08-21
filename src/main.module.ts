import { Module } from '@nestjs/common';
import { ResourceModule } from './resource/resource.module';
import { ConfigModule } from '@nestjs/config';

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
    ResourceModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
