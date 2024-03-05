import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ValueServices } from './values.service';
import { ListFieldsQueryDto } from './dto/list-values.dto';

@Controller('values')
export class ValuesController {
  constructor(private readonly valuesServices: ValueServices) {}

  @Get()
  async findAll(@Query() query: ListFieldsQueryDto): Promise<{ data: any[] }> {
    // Bundling Params
    const paramFilter = {
      fieldId: query.fieldId ? query.fieldId : null
    }
    return {
      data: await this.valuesServices.findAll(paramFilter)
    }
  }
}
