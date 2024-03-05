import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Species } from './species/models/species.model';
import { SpeciesModule } from './species/species.module';
import { FieldCategoriesModule } from './field-categories/field-categories.module';
import { FieldCategories } from './field-categories/models/field_categories.model';
import { FieldsModule } from './fields/fields.module';
import { Fields } from './fields/models/fields.model';
import { ValuesModule } from './values/values.module';
import { FamilyNames } from './values/models/family_names.model';
import { NativeHabitats } from './values/models/native_habitats.model';
import { PreferredClimateZones } from './values/models/preferred_climate_zones.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRE_HOST || 'localhost',
      port: parseInt(process.env.POSTGRE_PORT) || 5432,
      username: process.env.POSTGRE_USER || 'postgres',
      password: process.env.POSTGRE_PASS || '',
      database: process.env.POSTGRE_DB_NAME || 'metapals',
      models: [Species,FieldCategories,Fields,FamilyNames,NativeHabitats,PreferredClimateZones],
    }),
    SpeciesModule,
    FieldCategoriesModule,
    FieldsModule,
    ValuesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
