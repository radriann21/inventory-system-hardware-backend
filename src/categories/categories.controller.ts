import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createNewCategory(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAllCategories();
  }

  @Get('/name/:name')
  findOne(@Param('name') name: string) {
    return this.categoriesService.findOneCategoryByName(name);
  }

  @Get('/id/:id')
  findOneById(@Param('id') id: string) {
    return this.categoriesService.findOneCategoryById(+id);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(+id);
  }
}
