import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createNewCategory(createCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.categoriesService.findAllCategories();
  }

  @UseGuards(AuthGuard)
  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('name') name: string) {
    return this.categoriesService.findOneCategoryByName(name);
  }

  @UseGuards(AuthGuard)
  @Get('/id/:id')
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id') id: string) {
    return this.categoriesService.findOneCategoryById(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(+id);
  }
}
