import {
  Controller,
  Get,
  NotImplementedException,
  Post,
  Put,
} from '@nestjs/common';

@Controller('resources')
export class ResourceController {
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
