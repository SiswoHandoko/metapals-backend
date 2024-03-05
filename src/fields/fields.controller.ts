import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Fields } from './models/fields.model';
import { FieldsServices } from './fields.service';
import { ListFieldsQueryDto } from './dto/list-fields.dto';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsServices: FieldsServices) {}

  @Get()
  async findAll(@Query() query: ListFieldsQueryDto): Promise<{ data: Fields[] }> {
    // Bundling Params
    const paramFilter = {
      fieldCategoryId: query.fieldCategoryId ? query.fieldCategoryId : null
    }
    return {
      data: await this.fieldsServices.findAll(paramFilter)
    }
  }
}
