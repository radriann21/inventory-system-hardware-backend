import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({
  tableName: 'exchange_rates',
  timestamps: false,
})
export class Rate extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  declare rate_value: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare updated_at: Date;
}
