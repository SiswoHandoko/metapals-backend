import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Fields } from './models/fields.model';
import { FieldsController } from './fields.controller';
import { FieldsServices } from './fields.service';

@Module({
  imports: [SequelizeModule.forFeature([Fields])],
  providers: [FieldsServices],
  controllers: [FieldsController],
})
export class FieldsModule {}
