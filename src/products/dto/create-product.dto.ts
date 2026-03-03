import { IsString, IsNumber, IsBoolean } from 'class-validator';
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
    description: 'Código SKU interno del producto',
    example: 'SKU-001-2024',
    type: String,
  })
  @IsString()
  internal_sku: string;

  @ApiProperty({
    description: 'Precio del producto en dólares (USD)',
    example: '399.99',
    type: String,
  })
  @IsString()
  price_usd: string;

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
    description: 'Marca del producto',
    example: 'Intel',
    type: String,
  })
  @IsString()
  brand: string;

  @ApiProperty({
    description: 'Estado de activación del producto',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  is_active: boolean;

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
  tax_percentage: number;
}
