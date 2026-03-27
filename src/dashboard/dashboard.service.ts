import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { StockMovements } from 'src/stock/entities/stock.entity';
import { Category } from 'src/categories/entities/category.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op, fn, literal } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

interface ProductByCategory {
  category_id: number;
  count: string;
  'category.name': string;
}

interface TotalValueResult {
  total: number | null;
}

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
    @InjectModel(StockMovements)
    private readonly stockMovementsModel: typeof StockMovements,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async getDashboard() {
    try {
      this.logger.log('Obteniendo datos del dashboard');

      const [
        lowStockProducts,
        totalValueRaw,
        recentMovements,
        totalProducts,
        productsByCategoryRaw,
      ] = await Promise.all([
        // TODOS LOS PRODUCTOS CON LOW STOCK
        this.productModel.findAll({
          where: {
            actual_stock: {
              [Op.lte]: Sequelize.col('min_stock'),
            },
            is_active: true,
          },
        }),
        // Valor total del inventario
        this.productModel.findAll<Product>({
          attributes: [
            [fn('SUM', literal('price_usd * actual_stock')), 'total'],
          ],
          raw: true,
        }) as unknown as Promise<TotalValueResult[]>,
        // Movimientos Recientes
        this.stockMovementsModel.findAll({
          limit: 5,
          order: [['created_at', 'DESC']],
          include: [
            {
              model: this.productModel,
              as: 'product',
              attributes: ['name'],
            },
          ],
        }),
        // Total de productos
        this.productModel.count({
          where: { is_active: true },
        }),
        // Porcentaje de Productos por categoría
        this.productModel.findAll<Product>({
          attributes: ['category_id', [fn('COUNT', '*'), 'count']],
          where: { is_active: true },
          group: ['Product.category_id', 'category.id'],
          include: [
            {
              model: this.categoryModel,
              as: 'category',
              attributes: ['name'],
            },
          ],
          order: [['category', 'name', 'ASC']],
          raw: true,
        }) as unknown as Promise<ProductByCategory[]>,
      ]);

      if (!totalValueRaw || totalValueRaw.length === 0) {
        this.logger.warn('No se encontró valor total del inventario');
      }

      const totalValue = totalValueRaw[0]?.total ?? 0;

      const mappedProductsByCategory = productsByCategoryRaw.map((product) => ({
        category: product['category.name'] || 'Sin categoría',
        count: String(product.count || 0),
        percentage:
          totalProducts > 0
            ? Math.round((Number(product.count || 0) / totalProducts) * 100)
            : 0,
      }));

      return {
        lowStockProducts: lowStockProducts || [],
        totalValue,
        recentMovements: recentMovements || [],
        productsByCategory: mappedProductsByCategory,
      };
    } catch (error) {
      this.logger.error(
        'Error al obtener dashboard',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException(
        'Error al cargar el dashboard. Por favor, intente nuevamente.',
      );
    }
  }
}
