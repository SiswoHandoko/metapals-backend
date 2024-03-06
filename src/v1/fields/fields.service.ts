import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Fields } from './models/fields.model';
import { ParamFilter } from './interface/fields.interface';

@Injectable()
export class FieldsServices {
  constructor(
    @InjectModel(Fields)
    private readonly fieldsModel: typeof Fields,
  ) {}

  async findAll(paramFilter:ParamFilter): Promise<Fields[]> {
    const { fieldCategoryId } = paramFilter;
    const where = fieldCategoryId ? { fieldCategoryId } : {};
    
    return this.fieldsModel.findAll({ where });
  }
}
