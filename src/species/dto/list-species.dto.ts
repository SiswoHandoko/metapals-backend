import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ListSpeciesQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  perPage: string;

  @IsNumberString()
  @IsOptional()
  fieldId?: string;

  @IsNumberString()
  @IsOptional()
  valueId?: string;

  @IsString()
  @IsOptional()
  value?: string;

  @IsString()
  @IsOptional()
  search?: string;
}