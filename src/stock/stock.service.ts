import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { StockMovements } from './entities/stock.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Measure } from 'src/measures/entities/measure.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Op } from 'sequelize';

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);
  constructor(
    private sequelize: Sequelize,
    @InjectModel(StockMovements) private stockRepository: typeof StockMovements,
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  async createNewMovement(createStockDto: CreateStockDto) {
    try {
      await this.sequelize.transaction(async (t) => {
        const product = await this.productRepository.findOne({
          where: { id: createStockDto.product_id },
          transaction: t,
        });

        if (!product) {
          throw new NotFoundException('No se ha encontrado el producto.');
        }

        if (
          createStockDto.type === 'salida' &&
          product.actual_stock < createStockDto.quantity
        ) {
          throw new BadRequestException('No hay stock suficiente.');
        }

        await this.stockRepository.create(
          { ...createStockDto },
          { transaction: t },
        );

        const movementType = createStockDto.type;
        await this.productRepository.update(
          {
            actual_stock:
              movementType === 'entrada'
                ? this.sequelize.literal(
                    `actual_stock + ${createStockDto.quantity}`,
                  )
                : this.sequelize.literal(
                    `actual_stock - ${createStockDto.quantity}`,
                  ),
          },
          { where: { id: createStockDto.product_id }, transaction: t },
        );
      });

      return {
        message: 'Movimiento guardado correctamente.',
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('Algo ocurrió al guardar.');
    }
  }

  async getAllMovements(paginationDto: PaginationDto) {
    try {
      const { page = 1, limit = 10 } = paginationDto;
      const offset = (page - 1) * limit;

      const { count, rows: movements } =
        await this.stockRepository.findAndCountAll({
          limit,
          offset,
          where: paginationDto.search
            ? {
                [Op.or]: [
                  { description: { [Op.iLike]: `%${paginationDto.search}%` } },
                  { type: { [Op.iLike]: `%${paginationDto.search}%` } },
                  {
                    '$product.name$': {
                      [Op.iLike]: `%${paginationDto.search}%`,
                    },
                  },
                ],
              }
            : {},
          include: [
            {
              model: Product,
              as: 'product',
              include: [
                {
                  model: Category,
                  as: 'category',
                },
                {
                  model: Measure,
                  as: 'measure',
                },
              ],
            },
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'lastname', 'username'],
            },
          ],
        });

      if (!movements || movements.length === 0) {
        throw new NotFoundException('No se ha encontrado ningún movimiento.');
      }

      return {
        data: movements,
        meta: {
          total: count,
          page,
          limit,
        },
      };
    } catch (err) {
      this.logger.error('Ha ocurrido un error', err);
      throw new InternalServerErrorException(
        'Algo ocurrió al obtener los movimientos.',
      );
    }
  }
}
