import { Module } from '@nestjs/common';
import { CustomLifecycleService } from './custom-lifecycle.service';

@Module({
  providers: [CustomLifecycleService],
})
export class CustomLifecycleModule {}
