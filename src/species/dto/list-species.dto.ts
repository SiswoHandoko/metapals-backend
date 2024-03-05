import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ListSpeciesQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  perPage: string;

  @IsString()
  @IsOptional()
  field?: string;

  @IsString()
  @IsOptional()
  value?: string;
}