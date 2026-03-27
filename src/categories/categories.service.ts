import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async createNewCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.findOne({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (category) {
      throw new ConflictException('La categoría ya existe');
    }

    try {
      const newCategory = await this.categoryModel.create({
        ...createCategoryDto,
      });

      await this.cacheManager.del('categories');

      return newCategory;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Algo fue mal.');
    }
  }

  async findAllCategories() {
    const cacheKey = 'categories';
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const categories = await this.categoryModel.findAll({
        where: { is_active: true },
      });
      if (!categories) {
        throw new NotFoundException('Categorías no encontradas');
      }

      await this.cacheManager.set(cacheKey, categories, 3600000);

      return categories;
    } catch {
      throw new InternalServerErrorException('Algo fue mal.');
    }
  }

  async findOneCategoryByName(name: string) {
    const cacheKey = `category-name-${name.toLowerCase()}`;
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    const category = await this.categoryModel.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    await this.cacheManager.set(cacheKey, category, 3600000);

    return category;
  }

  async findOneCategoryById(id: number) {
    const cacheKey = `category-${id}`;
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    await this.cacheManager.set(cacheKey, category, 3600000);

    return category;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    try {
      await category?.update({ is_active: false });
      await this.cacheManager.del('categories');
      await this.cacheManager.del(`category-${id}`);

      return { message: 'Categoría desactivada exitosamente' };
    } catch {
      throw new InternalServerErrorException('Algo fue mal.');
    }
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const updatedCategory = await category?.update({
      ...updateCategoryDto,
    });

    if (!updatedCategory) {
      throw new NotFoundException('Categoría no encontrada');
    }

    await this.cacheManager.del('categories');
    await this.cacheManager.del(`category-${id}`);

    return updatedCategory;
  }
}
