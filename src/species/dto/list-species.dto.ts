import { IsNumberString } from 'class-validator';

export class ListSpeciesQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  perPage: string;
}