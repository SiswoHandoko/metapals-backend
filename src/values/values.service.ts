import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NativeHabitats } from './models/native_habitats.model';
import { ParamFilter, ValuesData } from './interface/fields.interface';
import { FamilyNames } from './models/family_names.model';
import { PreferredClimateZones } from './models/preferred_climate_zones.model';

@Injectable()
export class ValueServices {
  constructor(
    @InjectModel(FamilyNames) private readonly familyNamesModel: typeof FamilyNames,
    @InjectModel(NativeHabitats) private readonly nativeHabitatsModel: typeof NativeHabitats,
    @InjectModel(PreferredClimateZones) private readonly preferredClimateZonesModel: typeof PreferredClimateZones,
  ) {}

  async findAll(paramFilter:ParamFilter): Promise<ValuesData[]> {
    // ansuming id can be static parameter which never changes by user for clasification
    let data:any;
    switch (paramFilter.fieldId) {
      case '1': // ansuming id 1 is always "Family Name" and cannot be changes by user/app
        data = await this.familyNamesModel.findAll();
        break;
      case '2': // ansuming id 2 is always "Common Name" and cannot be changes by user/app
        data = []; // it means user need to be input manually using form input on web interface
        break;
      case '3': // ansuming id 3 is always "Native Habitat" and cannot be changes by user/app
        data = await this.nativeHabitatsModel.findAll();
        break;
      case '4': // ansuming id 4 is always "Preferred Climate" Zones and cannot be changes by user/app
      data = await this.preferredClimateZonesModel.findAll();
        break;
      default:  // we can dynamically add more clasification on future with this schema
        break;
    }
    return data;
  }
}
