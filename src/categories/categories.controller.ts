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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('categories')
@ApiCookieAuth('access_token')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    summary: 'Crear nueva categoría',
    description: 'Crea una nueva categoría de productos en el sistema',
  })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada exitosamente',
    schema: {
      example: {
        id: 1,
        name: 'Procesadores',
        description: 'Categoría para procesadores Intel y AMD',
        is_active: true,
        createdAt: '2024-03-02T20:30:00.000Z',
        updatedAt: '2024-03-02T20:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createNewCategory(createCategoryDto);
  }

  @ApiOperation({
    summary: 'Obtener todas las categorías',
    description: 'Retorna una lista con todas las categorías registradas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías obtenida exitosamente',
    schema: {
      example: [
        {
          id: 1,
          name: 'Procesadores',
          description: 'Categoría para procesadores Intel y AMD',
          is_active: true,
          createdAt: '2024-03-02T20:30:00.000Z',
          updatedAt: '2024-03-02T20:30:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.categoriesService.findAllCategories();
  }

  @ApiOperation({
    summary: 'Buscar categoría por nombre',
    description: 'Busca y retorna una categoría específica por su nombre',
  })
  @ApiParam({
    name: 'name',
    description: 'Nombre de la categoría a buscar',
    example: 'Procesadores',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada',
    schema: {
      example: {
        id: 1,
        name: 'Procesadores',
        description: 'Categoría para procesadores Intel y AMD',
        is_active: true,
        createdAt: '2024-03-02T20:30:00.000Z',
        updatedAt: '2024-03-02T20:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('name') name: string) {
    return this.categoriesService.findOneCategoryByName(name);
  }

  @ApiOperation({
    summary: 'Buscar categoría por ID',
    description: 'Busca y retorna una categoría específica por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada',
    schema: {
      example: {
        id: 1,
        name: 'Procesadores',
        description: 'Categoría para procesadores Intel y AMD',
        is_active: true,
        createdAt: '2024-03-02T20:30:00.000Z',
        updatedAt: '2024-03-02T20:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Get('/id/:id')
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id') id: string) {
    return this.categoriesService.findOneCategoryById(+id);
  }

  @ApiOperation({
    summary: 'Actualizar categoría',
    description: 'Actualiza los datos de una categoría existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría a actualizar',
    example: 1,
  })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada exitosamente',
    schema: {
      example: {
        id: 1,
        name: 'Procesadores Intel',
        description: 'Categoría actualizada para procesadores Intel',
        is_active: true,
        createdAt: '2024-03-02T20:30:00.000Z',
        updatedAt: '2024-03-02T21:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @ApiOperation({
    summary: 'Eliminar categoría',
    description: 'Elimina una categoría del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Categoría eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(+id);
  }
}
