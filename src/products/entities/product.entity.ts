import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Measure } from '../../measures/entities/measure.entity';
import { StockMovements } from '../../stock/entities/stock.entity';
import { CatalogProvider } from '../../providers/entities/catalog-provider.entity';
import { Category } from '../../categories/entities/category.entity';

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

  @ForeignKey(() => Measure)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare measure_id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 16,
  })
  declare tax_percentage: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare created_at: Date;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare category_id: number;

  @BelongsTo(() => Measure, 'measure_id')
  declare measure: Measure;

  @BelongsTo(() => Category, 'category_id')
  declare category: Category;

  @HasMany(() => StockMovements)
  declare stockMovements: StockMovements[];

  @HasMany(() => CatalogProvider)
  declare catalogProviders: CatalogProvider[];
}
