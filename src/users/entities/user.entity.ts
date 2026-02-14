import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import { StockMovements } from '../../stock/entities/stock.entity';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
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
  declare lastname;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare createdAt;

  @HasMany(() => StockMovements)
  declare stockMovements: StockMovements[];
}
