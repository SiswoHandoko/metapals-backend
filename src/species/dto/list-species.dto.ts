import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

enum SortBy {
  Name = 'name',
  CommonName = 'commonName',
}

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

  @IsString()
  @IsOptional()
  @IsEnum(SortBy, {
    message: `sortBy must be a valid enum value: ${Object.values(SortBy).join(', ')}`,
  })
  sortBy?: string;
}