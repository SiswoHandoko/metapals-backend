import { Sequelize } from 'sequelize';
import { BelongsTo, Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { FamilyNames } from '../../values/models/family_names.model';
import { NativeHabitats } from '../../values/models/native_habitats.model';
import { SpeciesPreferredClimateZones } from '../../values/models/species_preferred_climate_zones.model';

@Table({ tableName: 'species' })
export class Species extends Model {
  @Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true
	})
  id: number;

  @Column({
		type: DataType.INTEGER,
		allowNull: true,
    field: 'family_name_id',
    references: {
      model: 'family_names',
      key: 'id',
    },
	})
  familyNameId: number;

  @Column({
		type: DataType.INTEGER,
    allowNull: true,
    field: 'native_habitat_id',
    references: {
      model: 'native_habitats',
      key: 'id',
    },
	})
  nativeHabitatId: number;

  @Column({
		type: DataType.STRING,
		field: 'name',
    allowNull: false
	})
  name: string;

  @Column({
		type: DataType.STRING,
		field: 'common_name',
    allowNull: true
	})
  commonName: string;

  @Column({
		type: DataType.ENUM('animal','plant'),
		field: 'tag',
    allowNull: true
	})
  tag: string;

  @Column({
		type: DataType.STRING,
		field: 'image',
    allowNull: false
	})
  image: string;
  
  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
    field: 'created_at'
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
    field: 'updated_at'
  })
  updatedAt: Date;

  //Association
  @HasMany(() => SpeciesPreferredClimateZones , {
    foreignKey: 'speciesId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  speciesPreferredClimateZones: SpeciesPreferredClimateZones[];
  
  @BelongsTo(() => FamilyNames, {
    foreignKey: 'familyNameId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  familyName: FamilyNames;

  @BelongsTo(() => NativeHabitats, {
    foreignKey: 'nativeHabitatId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  nativeHabitat: NativeHabitats;

  
}
