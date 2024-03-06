import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Species } from './models/species.model';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { PreferredClimateZones } from 'src/v1/values/models/preferred_climate_zones.model';
import { NativeHabitats } from 'src/v1/values/models/native_habitats.model';
import { FamilyNames } from 'src/v1/values/models/family_names.model';
import { SpeciesPreferredClimateZones } from 'src/v1/values/models/species_preferred_climate_zones.model';

@Module({
  imports: [SequelizeModule.forFeature([Species,FamilyNames,NativeHabitats,PreferredClimateZones, SpeciesPreferredClimateZones])],
  providers: [SpeciesService],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
