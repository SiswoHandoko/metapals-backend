import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './models/species.model';
import { SpeciesService } from './species.service';
import { ListSpeciesQueryDto } from './dto/list-species.dto';
import { TransformedData } from './interface/species.interface';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('v1/species')
export class SpeciesController {
  constructor(
    private readonly speciesService: SpeciesService,
  ) {}

  @Post()
  create(@Body() createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    return this.speciesService.create(createSpeciesDto);
  }

  @UseGuards(ThrottlerGuard) // use rate limiter 
  @Get()
  async findAll(@Query() query: ListSpeciesQueryDto): Promise<TransformedData> {
    
    // Bundling Params
    const paramFilter = {
      page: parseInt(query.page),
      perPage: parseInt(query.perPage),
      fieldId: query.fieldId ? query.fieldId : null,
      valueId: query.valueId ? query.valueId : null,
      value: query.value ? query.value : null,
      search: query.search ? query.search : null,
      sortBy: query.sortBy ? query.sortBy : null,
    }

    const species = await this.speciesService.findAll(paramFilter);
    
    // transform data format
    const transformedData:TransformedData = {
      page: query.page,
      perPage: query.perPage,
      meta: '',
      total: species.total,
      data: species.data.map(item => ({
        id: item.dataValues.id,
        familyNameId: item.dataValues.familyNameId,
        nativeHabitatId: item.dataValues.nativeHabitatId,
        name: item.dataValues.name,
        commonName: item.dataValues.commonName,
        tag: item.dataValues.tag,
        image: item.dataValues.image,
        createdAt: item.dataValues.createdAt,
        updatedAt: item.dataValues.updatedAt
      })),
    };
    return transformedData;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Species> {
    return this.speciesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.speciesService.remove(id);
  }
}
