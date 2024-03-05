import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Species } from './models/species.model';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';

@Module({
  imports: [SequelizeModule.forFeature([Species])],
  providers: [SpeciesService],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
