import { Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'fields' })
export class Fields extends Model {
  @Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true
	})
  id: number;

  @Column({
		type: DataType.INTEGER,
		allowNull: false,
    field: 'field_category_id',
    references: {
      model: 'field_categories',
      key: 'id',
    },
	})
  fieldCategoryId: number;

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

  static associate(models) {
  }
}
