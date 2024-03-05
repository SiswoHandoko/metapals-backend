import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FieldCategories } from './models/field_categories.model';

@Injectable()
export class FieldCategoriesServices {
  constructor(
    @InjectModel(FieldCategories)
    private readonly fieldCategoriesModel: typeof FieldCategories,
  ) {}

  async findAll(): Promise<FieldCategories[]> {
    return this.fieldCategoriesModel.findAll();
  }
}
