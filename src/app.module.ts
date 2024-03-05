import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Species } from './species/models/species.model';
import { SpeciesModule } from './species/species.module';
import { FieldCategoriesModule } from './field-categories/field-categories.module';
import { FieldCategories } from './field-categories/models/field_categories.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRE_HOST || 'localhost',
      port: parseInt(process.env.POSTGRE_PORT) || 5432,
      username: process.env.POSTGRE_USER || 'postgres',
      password: process.env.POSTGRE_PASS || '',
      database: process.env.POSTGRE_DB_NAME || 'metapals',
      models: [Species,FieldCategories],
    }),
    SpeciesModule,
    FieldCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
