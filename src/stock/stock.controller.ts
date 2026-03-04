import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
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
    return this.stockService.createNewMovement(createStockDto);
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
    return this.stockService.getAllMovements();
  }
}
