import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NativeHabitats } from './models/native_habitats.model';
import { ParamFilter } from './interface/fields.interface';
import { FamilyNames } from './models/family_names.model';
import { PreferredClimateZones } from './models/preferred_climate_zones.model';

@Injectable()
export class ValueServices {
  constructor(
    @InjectModel(FamilyNames) private readonly familyNamesModel: typeof FamilyNames,
    @InjectModel(NativeHabitats) private readonly nativeHabitatsModel: typeof NativeHabitats,
    @InjectModel(PreferredClimateZones) private readonly preferredClimateZonesModel: typeof PreferredClimateZones,
  ) {}

  async findAll(paramFilter:ParamFilter): Promise<FamilyNames[]> {
    
    return this.familyNamesModel.findAll();
  }
}
