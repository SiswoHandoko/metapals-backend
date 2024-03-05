import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ValuesController } from './values.controller';
import { ValueServices } from './values.service';
import { FamilyNames } from './models/family_names.model';
import { NativeHabitats } from './models/native_habitats.model';
import { PreferredClimateZones } from './models/preferred_climate_zones.model';

@Module({
  imports: [SequelizeModule.forFeature([FamilyNames,NativeHabitats,PreferredClimateZones])],
  providers: [ValueServices],
  controllers: [ValuesController],
})
export class ValuesModule {}
