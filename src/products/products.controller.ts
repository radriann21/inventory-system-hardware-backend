import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('products')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Crear nuevo producto',
    description: 'Crea un nuevo producto en el inventario',
  })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Producto creado exitosamente',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Intel Core i7-13700K',
        description: 'Procesador Intel Core i7 de 13va generación, 16 núcleos',
        price_usd: '399.99',
        actual_stock: 50,
        min_stock: 10,
        is_active: true,
        measure_id: 1,
        category_id: 1,
        tax_percentage: 16,
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
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createNewProduct(createProductDto);
  }

  @ApiOperation({
    summary: 'Obtener todos los productos',
    description: 'Retorna una lista con todos los productos del inventario',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida exitosamente',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Intel Core i7-13700K',
          description: 'Procesador Intel Core i7 de 13va generación',
          price_usd: '399.99',
          actual_stock: 50,
          min_stock: 10,
          is_active: true,
          measure_id: 1,
          category_id: 1,
          tax_percentage: 16,
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
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.getAllProducts(paginationDto);
  }

  @ApiOperation({
    summary: 'Buscar producto por nombre',
    description: 'Busca y retorna un producto específico por su nombre',
  })
  @ApiParam({
    name: 'name',
    description: 'Nombre del producto a buscar',
    example: 'Intel Core i7-13700K',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Intel Core i7-13700K',
        description: 'Procesador Intel Core i7 de 13va generación',
        price_usd: '399.99',
        actual_stock: 50,
        min_stock: 10,
        is_active: true,
        measure_id: 1,
        category_id: 1,
        tax_percentage: 16,
        createdAt: '2024-03-02T20:30:00.000Z',
        updatedAt: '2024-03-02T20:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Get('name/:name')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('name') name: string) {
    return this.productsService.getProductByName(name);
  }

  @ApiOperation({
    summary: 'Buscar producto por ID',
    description: 'Busca y retorna un producto específico por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto a buscar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Intel Core i7-13700K',
        description: 'Procesador Intel Core i7 de 13va generación',
        price_usd: '399.99',
        actual_stock: 50,
        min_stock: 10,
        is_active: true,
        measure_id: 1,
        category_id: 1,
        tax_percentage: 16,
        createdAt: '2024-03-02T20:30:00.000Z',
        updatedAt: '2024-03-02T20:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiOperation({
    summary: 'Eliminar producto',
    description: 'Elimina un producto del inventario',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto a eliminar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado exitosamente',
    schema: {
      example: {
        message: 'Product deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @ApiOperation({
    summary: 'Actualizar producto',
    description: 'Actualiza los datos de un producto existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado exitosamente',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Intel Core i7-13700K',
        description: 'Procesador Intel Core i7 actualizado',
        price_usd: '379.99',
        actual_stock: 45,
        min_stock: 10,
        is_active: true,
        measure_id: 1,
        category_id: 1,
        tax_percentage: 16,
        createdAt: '2024-03-02T20:30:00.000Z',
        updatedAt: '2024-03-02T21:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }
}
