import { Module } from '@nestjs/common';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [ResourceModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
