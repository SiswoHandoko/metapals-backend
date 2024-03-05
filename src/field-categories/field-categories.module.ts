import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FieldCategories } from './models/field_categories.model';
import { FieldCategoriesController } from './field-categories.controller';
import { FieldCategoriesServices } from './field-categories.service';

@Module({
  imports: [SequelizeModule.forFeature([FieldCategories])],
  providers: [FieldCategoriesServices],
  controllers: [FieldCategoriesController],
})
export class FieldCategoriesModule {}
