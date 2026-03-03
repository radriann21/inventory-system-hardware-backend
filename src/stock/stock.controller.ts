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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('stock')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiOperation({
    summary: 'Registrar movimiento de stock',
    description: 'Registra un nuevo movimiento de entrada o salida de stock',
  })
  @ApiBody({ type: CreateStockDto })
  @ApiResponse({
    status: 201,
    description: 'Movimiento de stock registrado exitosamente',
    schema: {
      example: {
        id: 1,
        product_id: '123e4567-e89b-12d3-a456-426614174000',
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        quantity: 10,
        type: 'entrada',
        description: 'Compra de productos',
        created_at: '2024-03-02T20:30:00.000Z',
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
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @ApiOperation({
    summary: 'Obtener todos los movimientos de stock',
    description:
      'Retorna una lista con todos los movimientos de stock registrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de movimientos obtenida exitosamente',
    schema: {
      example: [
        {
          id: 1,
          product_id: '123e4567-e89b-12d3-a456-426614174000',
          user_id: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 10,
          type: 'entrada',
          description: 'Compra de productos',
          created_at: '2024-03-02T20:30:00.000Z',
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
    return this.stockService.findAll();
  }

  @ApiOperation({
    summary: 'Buscar movimiento de stock por ID',
    description: 'Busca y retorna un movimiento de stock específico por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del movimiento de stock a buscar',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Movimiento de stock encontrado',
    schema: {
      example: {
        id: 1,
        product_id: '123e4567-e89b-12d3-a456-426614174000',
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        quantity: 10,
        type: 'entrada',
        description: 'Compra de productos',
        created_at: '2024-03-02T20:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Movimiento de stock no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Actualizar movimiento de stock',
    description: 'Actualiza los datos de un movimiento de stock existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del movimiento de stock a actualizar',
    example: '1',
  })
  @ApiBody({ type: UpdateStockDto })
  @ApiResponse({
    status: 200,
    description: 'Movimiento de stock actualizado exitosamente',
    schema: {
      example: {
        id: 1,
        product_id: '123e4567-e89b-12d3-a456-426614174000',
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        quantity: 15,
        type: 'entrada',
        description: 'Compra de productos actualizada',
        created_at: '2024-03-02T20:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Movimiento de stock no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @ApiOperation({
    summary: 'Eliminar movimiento de stock',
    description: 'Elimina un movimiento de stock del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del movimiento de stock a eliminar',
    example: '1',
  })
  @ApiResponse({
    status: 204,
    description: 'Movimiento de stock eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Movimiento de stock no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
