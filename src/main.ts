import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLifecycleService } from './custom-lifecycle/custom-lifecycle.service';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const customLifecycleService = app.get(CustomLifecycleService);
  customLifecycleService.applyCustomOnModuleInitLifecycleHooks();

  // Swagger
  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('explorer', app, document);
  await app.listen(3000);
}
bootstrap();
