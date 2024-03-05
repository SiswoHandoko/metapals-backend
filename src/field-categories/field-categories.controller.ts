import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FieldCategories } from './models/field_categories.model';
import { FieldCategoriesServices } from './field-categories.service';

@Controller('field-categories')
export class FieldCategoriesController {
  constructor(private readonly fieldCategoriesService: FieldCategoriesServices) {}

  @Get()
  async findAll(): Promise<{ data: FieldCategories[] }> {
    return {
      data: await this.fieldCategoriesService.findAll()
    }
  }
}
