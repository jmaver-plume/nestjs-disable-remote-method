import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Module } from '@nestjs/core/injector/module';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Injectable()
export class CustomLifecycleService {
  constructor(private readonly moduleRef: ModuleRef) {}
  applyCustomOnModuleInitLifecycleHooks() {
    const modules: Module[] = Array.from(
      this.moduleRef['container']['modules'].values(),
    );
    modules.forEach((module) => {
      const controllers: InstanceWrapper[] = Array.from(
        module['_controllers'].values(),
      );
      controllers.forEach((controller) => {
        const controllerClass = controller.metatype;
        const controllerInstance = this.moduleRef.get(controllerClass, {
          strict: false,
        });

        if (controllerInstance && 'onCustomModuleInit' in controllerInstance) {
          controllerInstance.onCustomModuleInit();
        }
      });
    });
  }
}
