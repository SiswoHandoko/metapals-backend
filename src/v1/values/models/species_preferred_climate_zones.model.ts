import { Sequelize } from 'sequelize';
import { BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Species } from '../../species/models/species.model';
import { PreferredClimateZones } from './preferred_climate_zones.model';

@Table({ tableName: 'species_preferred_climate_zones' })
export class SpeciesPreferredClimateZones extends Model {
  @Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true
	})
  id: number;

  @Column({
		type: DataType.INTEGER,
		allowNull: false,
    field: 'species_id',
    references: {
      model: 'species',
      key: 'id',
    },
	})
  speciesId: number;

  @Column({
		type: DataType.INTEGER,
		allowNull: false,
    field: 'preferred_climate_zone_id',
    references: {
      model: 'preferred_climate_zones',
      key: 'id',
    },
	})
  preferredClimateZoneId: number;
  
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
  @BelongsTo(() => Species, {
    foreignKey: 'speciesId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  species: Species;

  @BelongsTo(() => PreferredClimateZones, {
    foreignKey: 'preferredClimateZoneId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  preferredClimateZones: PreferredClimateZones;
}
