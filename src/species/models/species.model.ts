import { Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

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

  static associate(models) {
    // this.hasOne(models.Auth, { foreignKey: 'user_id', as: 'auth' });
  }
}
