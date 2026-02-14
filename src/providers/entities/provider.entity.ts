import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';

@Table({
  tableName: 'providers',
  timestamps: false,
})
export class Provider extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone_number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare contact_name;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare address;

  @HasMany(() => Product)
  declare products: Product[];
}
