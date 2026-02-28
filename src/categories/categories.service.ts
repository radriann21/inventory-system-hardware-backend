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

@Injectable()
export class CategoriesService {
  async createNewCategory(createCategoryDto: CreateCategoryDto) {
    const category = await Category.findOne({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (category) {
      throw new ConflictException('The category already exists');
    }

    try {
      const newCategory = await Category.create({ ...createCategoryDto });

      return newCategory;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAllCategories() {
    try {
      const categories = await Category.findAll();
      if (!categories) {
        throw new NotFoundException('Categories not found');
      }
      return categories;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOneCategoryByName(name: string) {
    const category = await Category.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findOneCategoryById(id: number) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async deleteCategory(id: number) {
    const category = await Category.destroy({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const updatedCategory = await category?.update({
      ...updateCategoryDto,
    });

    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }
    return updatedCategory;
  }
}
