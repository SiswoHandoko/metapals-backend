import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './models/species.model';
import { SpeciesService } from './species.service';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  create(@Body() createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  findAll(): Promise<Species[]> {
    return this.speciesService.findAll();
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
