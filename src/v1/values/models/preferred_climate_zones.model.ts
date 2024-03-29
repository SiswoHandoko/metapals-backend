import { Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { SpeciesPreferredClimateZones } from './species_preferred_climate_zones.model';

@Table({ tableName: 'preferred_climate_zones' })
export class PreferredClimateZones extends Model {
  @Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true
	})
  id: number;

  @Column({
		type: DataType.STRING,
		field: 'name',
    allowNull: false
	})
  name: string;
  
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
  @HasMany(() => SpeciesPreferredClimateZones, {
    foreignKey: 'preferredClimateZoneId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  speciesPreferredClimateZones: SpeciesPreferredClimateZones[];
}
