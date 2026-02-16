import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Measure } from './measure.entity';
import { StockMovements } from '../../stock/entities/stock.entity';
import { Provider } from '../../providers/entities/provider.entity';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class Product extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare internal_sku: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  declare price_usd: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare actual_stock: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare min_stock: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare brand: string;

  @ForeignKey(() => Measure)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare measure_id: number;

  @ForeignKey(() => Provider)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare provider_id: string;

  @BelongsTo(() => Measure, 'measure_id')
  declare measure: Measure;

  @BelongsTo(() => Provider, 'provider_id')
  declare provider: Provider;

  @HasMany(() => StockMovements)
  declare stockMovements: StockMovements[];
}
