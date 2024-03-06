import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ListFieldsQueryDto {
  @IsNumberString()
  @IsOptional()
  fieldCategoryId?: string;
}