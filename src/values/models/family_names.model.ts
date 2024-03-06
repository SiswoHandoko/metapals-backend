import { Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Species } from '../../species/models/species.model';

@Table({ tableName: 'family_names' })
export class FamilyNames extends Model {
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
  @HasMany(() => Species, {
    foreignKey: 'familyNameId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  species: Species[];
}
