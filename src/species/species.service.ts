import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './models/species.model';
import { ParamFilter } from './interface/species.interface';
import { FamilyNames } from '../values/models/family_names.model';
import { NativeHabitats } from '../values/models/native_habitats.model';
import { SpeciesPreferredClimateZones } from '../values/models/species_preferred_climate_zones.model';
import { Op } from 'sequelize';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectModel(Species) private readonly speciesModel: typeof Species,
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

    let modelInclude;
    let where={};

    if(paramFilter.search){
       where = {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${paramFilter.search}%`,
            },
          }
        ],
      }
    }

    // Parse Field and Value to be Advance Filter
    if(paramFilter.fieldId && (paramFilter.valueId || paramFilter.value)){
      switch (paramFilter.fieldId) {
        case '1': // ansuming id 1 is always "Family Name" and cannot be changes by user/app
          modelInclude = [{
            model: FamilyNames,
            as: 'familyName',
            attributes: ['id', 'name'],
            where: {
              id: paramFilter.valueId 
            }
          }];

          break;
        case '2': // ansuming id 2 is always "Common Name" and cannot be changes by user/app
          modelInclude = []; // we use param value on here
          
          where[Op.and] = {
            commonName: { [Op.iLike]: `%${paramFilter.value}%` }, 
          };
          break;
        case '3': // ansuming id 3 is always "Native Habitat" and cannot be changes by user/app
          modelInclude = [{
            model: NativeHabitats,
            as: 'nativeHabitat',
            attributes: ['id', 'name'],
            where: {
              id: paramFilter.valueId 
            }
          }];
          
          break;
        case '4': // ansuming id 4 is always "Preferred Climate" Zones and cannot be changes by user/app
          modelInclude = [{
            model: SpeciesPreferredClimateZones,
            as: 'speciesPreferredClimateZones',
            attributes: ['id', 'species_id', 'preferred_climate_zone_id'],
            where: {
              preferredClimateZoneId: paramFilter.valueId 
            }
          }];

          break;
        default:  // we can dynamically add more clasification on future with this schema
          modelInclude = [];
          break;
      }
    }
    
    // if there is any param sortBy
    let order = [];
    if(paramFilter.sortBy){
      switch (paramFilter.sortBy) {
        case 'name':
          order = [['name', 'ASC']];
          break;
        case 'commonName':
          order = [['commonName', 'ASC']];
          break;
        default:
          order = [];
          break;
      }
    }

    // using promise all for make code run concurrent/pararell
    const [data, total] = await Promise.all([
      this.speciesModel.findAll({
          limit: paramFilter.perPage, 
          offset,
          include: modelInclude,
          where: where,
          order: order
        }),
      this.speciesModel.count({
        include: modelInclude,
        where: where,
        distinct: true,
      })
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
