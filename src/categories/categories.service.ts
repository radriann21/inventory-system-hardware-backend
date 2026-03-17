import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
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

      return newCategory;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Algo fue mal.');
    }
  }

  async findAllCategories() {
    try {
      const categories = await this.categoryModel.findAll({
        where: { is_active: true },
      });
      if (!categories) {
        throw new NotFoundException('Categorías no encontradas');
      }
      return categories;
    } catch {
      throw new InternalServerErrorException('Algo fue mal.');
    }
  }

  async findOneCategoryByName(name: string) {
    const category = await this.categoryModel.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }
    return category;
  }

  async findOneCategoryById(id: number) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }
    return category;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    try {
      await category?.update({ is_active: false });
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
    return updatedCategory;
  }
}
