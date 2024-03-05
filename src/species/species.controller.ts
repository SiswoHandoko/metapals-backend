import { Body, Controller, Delete, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './models/species.model';
import { SpeciesService } from './species.service';
import { ListSpeciesQueryDto } from './dto/list-species.dto';
import { TransformedData } from './interface/species.interface';

@Controller('species')
export class SpeciesController {
  constructor(
    private readonly speciesService: SpeciesService,
  ) {}

  @Post()
  create(@Body() createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  async findAll(@Query() query: ListSpeciesQueryDto): Promise<TransformedData> {
    
    // Bundling Params
    const paramFilter = {
      page: parseInt(query.page),
      perPage: parseInt(query.perPage),
      field: query.field ? query.field : null,
      value: query.value ? query.value : null
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
