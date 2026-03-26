/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Logger } from '@nestjs/common';
import { Op } from 'sequelize';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Category } from 'src/categories/entities/category.entity';
import { Measure } from 'src/measures/entities/measure.entity';
import * as XLSX from 'xlsx';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
    @InjectModel(Measure)
    private readonly measureModel: typeof Measure,
  ) {}

  async createNewProduct(createProductDto: CreateProductDto) {
    try {
      const product = await this.productModel.create({ ...createProductDto });
      return product;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Ha ocurrido un error en el servidor',
      );
    }
  }

  async getAllProducts(paginationDto: PaginationDto) {
    try {
      const page = paginationDto.page ?? 1;
      const limit = paginationDto.limit ?? 10;

      const products = await this.productModel.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        where: paginationDto.search
          ? {
              [Op.or]: [
                { name: { [Op.iLike]: `%${paginationDto.search}%` } },
                { description: { [Op.iLike]: `%${paginationDto.search}%` } },
              ],
              is_active: true,
            }
          : {},
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'name'],
          },
          {
            model: Measure,
            as: 'measure',
            attributes: ['id', 'name', 'abbreviation'],
          },
        ],
      });

      if (products.count === 0) {
        return {
          data: [],
          meta: {
            total: 0,
            page,
            limit,
          },
        };
      }

      return {
        data: products.rows,
        meta: {
          total: products.count,
          page,
          limit,
        },
      };
    } catch (err) {
      this.logger.log('Error en el servidor' + err);
      throw new InternalServerErrorException(
        'Ha ocurrido un error en el servidor',
      );
    }
  }

  async getProductByName(name: string) {
    try {
      const product = await this.productModel.findOne({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });

      if (!product) {
        throw new NotFoundException('No se ha encontrado el producto.');
      }

      return product;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Ha ocurrido un error en el servidor',
      );
    }
  }

  async getProductById(id: string) {
    try {
      const product = await this.productModel.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException('No se encontró el producto.');
      }

      return product;
    } catch (err) {
      this.logger.log('Algo ha ido mal' + err);
      throw new InternalServerErrorException(
        'Ha ocurrido un error en el servidor',
      );
    }
  }

  async deleteProduct(id: string) {
    try {
      const [affectedCount] = await this.productModel.update(
        { is_active: false },
        { where: { id } },
      );

      if (affectedCount === 0) {
        throw new NotFoundException(
          'El producto que intentas eliminar, no existe.',
        );
      }

      return {
        message: 'El producto se ha desactivado correctamente',
      };
    } catch (err) {
      this.logger.error('Ha ocurrido un error en el servidor.' + err);
      throw new InternalServerErrorException(
        'Ha ocurrido un error al eliminar.',
      );
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      const { actual_stock, ...newProductData } = updateProductDto;

      const [affectedCount] = await this.productModel.update(
        { ...newProductData },
        { where: { id } },
      );

      if (affectedCount === 0) {
        throw new NotFoundException(
          'El producto que intentas actualizar, no existe.',
        );
      }

      return {
        message: 'Producto actualizado correctamente',
      };
    } catch (err) {
      this.logger.log('Error en el servidor' + err);
      throw new InternalServerErrorException(
        'Ha ocurrido un error en el servidor',
      );
    }
  }

  async exportProductsToExcel() {
    try {
      const products = await this.productModel.findAll({
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
        order: [['created_at', 'DESC']],
      });

      if (products.length === 0) {
        throw new NotFoundException('No se encontraron productos.');
      }

      const transformedProducts = products.map((product) => {
        const productData: Partial<Product> = product.toJSON();
        return {
          nombre: productData.name,
          descripcion: productData.description,
          precio_usd: productData.price_usd,
          stock_actual: productData.actual_stock,
          stock_minimo: productData.min_stock,
          categoria: productData.category?.name || 'Sin categoría',
          medida: productData.measure?.name || 'Sin medida',
          activo: productData.is_active ? 'Sí' : 'No',
          creado: productData.created_at
            ? new Date(productData.created_at).toISOString()
            : '',
        } as Partial<Product>;
      });

      const worksheet = XLSX.utils.json_to_sheet(transformedProducts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');
      XLSX.utils.sheet_add_json(worksheet, transformedProducts);
      const buf = XLSX.write(workbook, {
        type: 'buffer',
        bookType: 'xlsx',
      }) as Buffer;
      return new StreamableFile(buf);
    } catch (err) {
      this.logger.error('Error en el servidor' + err);
      throw new InternalServerErrorException(
        'Ha ocurrido un error en el servidor',
      );
    }
  }

  async importProductsFromExcel(file: Express.Multer.File) {
    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData = XLSX.utils
        .sheet_to_json(sheet, { header: 1 })
        .slice(1)
        .filter(
          (row: unknown[]) =>
            row[0] !== undefined && row[0] !== '' && row[0] !== null,
        );

      if (rawData.length === 0) {
        throw new BadRequestException('El archivo Excel está vacío.');
      }

      const categories = await this.categoryModel.findAll({
        where: {
          is_active: true,
        },
      });
      const measures = await this.measureModel.findAll({
        where: {
          is_active: true,
        },
      });

      const mappedData = rawData.map((row: unknown[]) => {
        const category = categories.find(
          (cat) => cat.name === row[5] && cat.is_active,
        );
        const measure = measures.find(
          (meas) => meas.name === row[6] && meas.is_active,
        );

        return {
          name: row[0],
          description: row[1],
          price_usd: row[2],
          actual_stock: row[3],
          min_stock: row[4],
          category_id: category?.id,
          measure_id: measure?.id,
        };
      });

      const result = await this.productModel.bulkCreate(mappedData);

      return {
        message: 'Productos importados exitosamente',
        result,
      };
    } catch (err) {
      this.logger.error('Error en el servidor' + err);
      throw new InternalServerErrorException(
        'Ha ocurrido un error en el servidor',
      );
    }
  }
}
