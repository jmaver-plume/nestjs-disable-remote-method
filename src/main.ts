import { ModuleRef, NestFactory, Reflector } from '@nestjs/core';
import { MainModule } from './main.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { Module } from '@nestjs/core/injector/module';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { GlobalInterceptor } from './global.interceptor';

function applyOnCustomModuleInitLifecycleHooks(app: INestApplication) {
  const moduleRef: ModuleRef = app.get(ModuleRef);
  const modules: Module[] = Array.from(
    moduleRef['container']['modules'].values(),
  );
  modules.forEach((module) => {
    const controllers: InstanceWrapper[] = Array.from(
      module['_controllers'].values(),
    );
    controllers.forEach((controller) => {
      const controllerClass = controller.metatype;
      const controllerInstance = moduleRef.get(controllerClass, {
        strict: false,
      });

      if (controllerInstance && 'onCustomModuleInit' in controllerInstance) {
        controllerInstance.onCustomModuleInit();
      }
    });
  });

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new GlobalInterceptor(reflector));
}

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  applyOnCustomModuleInitLifecycleHooks(app);

  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('explorer', app, document);
  await app.listen(3000);
}
bootstrap();
