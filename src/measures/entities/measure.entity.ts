import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';

@Table({
  tableName: 'measures',
  timestamps: false,
})
export class Measure extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare abbreviation: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_active: boolean;

  @HasMany(() => Product)
  declare product: Product[];
}
