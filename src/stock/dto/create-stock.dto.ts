import { IsString, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDto {
  @ApiProperty({
    description: 'ID del producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  product_id: string;

  @ApiProperty({
    description: 'ID del usuario que registra el movimiento',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    description: 'Cantidad del movimiento',
    example: 10,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Tipo de movimiento (entrada/salida)',
    example: 'entrada',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Descripción del movimiento',
    example: 'Compra de productos',
  })
  @IsString()
  description: string;
}
