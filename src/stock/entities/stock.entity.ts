import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Table({
  tableName: 'stock_movements',
  timestamps: false,
})
export class StockMovements extends Model {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare user_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;

  @Column({
    type: DataType.ENUM('ENTRY', 'EXIT', 'ADJUSTMENT'),
    allowNull: false,
  })
  declare movement_type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare created_at: Date;

  @BelongsTo(() => Product, 'product_id')
  declare product: Product;

  @BelongsTo(() => User, 'user_id')
  declare user: User;
}
