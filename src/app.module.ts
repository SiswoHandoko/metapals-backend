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
import { SpeciesPreferredClimateZones } from './values/models/species_preferred_climate_zones.model';
import { config } from 'dotenv';
import { ThrottlerModule } from '@nestjs/throttler';
config();
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: parseInt(process.env.POSTGRE_PORT_MASTER) || 5432,
      replication: {
        read: [
          {
            host: process.env.POSTGRE_HOST_SLAVE_0 || 'localhost',
            username: process.env.POSTGRE_USER_SLAVE_0 || 'postgres',
            password: process.env.POSTGRE_PASS_SLAVE_0 || '',
            database: process.env.POSTGRE_DB_SLAVE_0 || 'metapals',
          }
        ],
        write: {
          host: process.env.POSTGRE_HOST_MASTER || 'localhost',
          username: process.env.POSTGRE_USER_MASTER || 'postgres',
          password: process.env.POSTGRE_PASS_MASTER || '',
          database: process.env.POSTGRE_DB_MASTER || 'metapals',
        },
      },
      models: [Species,FieldCategories,Fields,FamilyNames,NativeHabitats,PreferredClimateZones,SpeciesPreferredClimateZones],
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // 60 second
      limit: 1000, // max 1000 request per 60 second
    }]),
    SpeciesModule,
    FieldCategoriesModule,
    FieldsModule,
    ValuesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
