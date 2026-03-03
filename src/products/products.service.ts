/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Logger } from '@nestjs/common';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
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

  async getAllProducts() {
    try {
      const products = await this.productModel.findAll();

      if (products.length === 0) {
        throw new NotFoundException('No hay productos.');
      }

      return products;
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
}
