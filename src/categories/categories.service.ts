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
      throw new ConflictException('The category already exists');
    }

    try {
      const newCategory = await this.categoryModel.create({
        ...createCategoryDto,
      });

      return newCategory;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAllCategories() {
    try {
      const categories = await this.categoryModel.findAll();
      if (!categories) {
        throw new NotFoundException('Categories not found');
      }
      return categories;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOneCategoryByName(name: string) {
    const category = await this.categoryModel.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findOneCategoryById(id: number) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    try {
      await category?.update({ is_active: false });
      return { message: 'Category deactivated successfully' };
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByPk(id);

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
