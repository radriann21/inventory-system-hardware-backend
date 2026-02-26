import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from './product.entity';
import { Provider } from '../../providers/entities/provider.entity';

@Table({
  tableName: 'catalog_provider',
  timestamps: false,
})
export class CatalogProvider extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare product_id: string;

  @ForeignKey(() => Provider)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare provider_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare provider_sku: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: true,
  })
  declare last_purchase_price: number;

  @BelongsTo(() => Product, 'product_id')
  declare product: Product;

  @BelongsTo(() => Provider, 'provider_id')
  declare provider: Provider;
}
