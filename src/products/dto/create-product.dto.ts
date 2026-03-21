import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Intel Core i7-13700K',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Procesador Intel Core i7 de 13va generación, 16 núcleos',
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Precio del producto en dólares (USD)',
    example: 399.99,
    type: Number,
  })
  @IsNumber()
  price_usd: number;

  @ApiProperty({
    description: 'Stock actual disponible',
    example: 50,
    type: Number,
  })
  @IsNumber()
  actual_stock: number;

  @ApiProperty({
    description: 'Stock mínimo requerido',
    example: 10,
    type: Number,
  })
  @IsNumber()
  min_stock: number;

  @ApiProperty({
    description: 'ID de la unidad de medida asociada',
    example: 1,
    type: Number,
  })
  @IsNumber()
  measure_id: number;

  @ApiProperty({
    description: 'ID de la categoría asociada',
    example: 1,
    type: Number,
  })
  @IsNumber()
  category_id: number;

  @ApiProperty({
    description: 'Porcentaje de impuesto aplicable',
    example: 16,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  tax_percentage: number;
}
