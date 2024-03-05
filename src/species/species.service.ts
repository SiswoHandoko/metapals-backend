import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './models/species.model';
import { ParamFilter } from './interface/species.interface';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectModel(Species)
    private readonly speciesModel: typeof Species,
  ) {}

  create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    return this.speciesModel.create({
      familyNameId: createSpeciesDto.familyNameId,
      nativeHabitatId: createSpeciesDto.nativeHabitatId,
      name: createSpeciesDto.name,
      commonName: createSpeciesDto.commonName,
      tag: createSpeciesDto.tag,
      image: createSpeciesDto.image,
    });
  }

  async findAll(paramFilter:ParamFilter): Promise<{ data: Species[]; total: number }> {
    const offset = (paramFilter.page - 1) * paramFilter.perPage;

    // Parse Field and Value to be Advance Filter
    if(paramFilter.field && paramFilter.value){
      switch (paramFilter.field) {
        case 'Family Name':
         
          break;
        case 'Common Name':
          
          break;
        case 'Native Habitat':
          
          break;
        case 'Preferred Climate Zones':
          
          break;
        default:
          break;
      }
    }

    // using promise all for make code run concurrent/pararell
    const [data, total] = await Promise.all([
      this.speciesModel.findAll({ limit: paramFilter.perPage, offset }),
      this.speciesModel.count()
    ]);

    return { data, total };
  }

  findOne(id: string): Promise<Species> {
    return this.speciesModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const species = await this.findOne(id);
    await species.destroy();
  }
}
