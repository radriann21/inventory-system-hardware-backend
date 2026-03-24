import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogProviderDto {
  @ApiProperty({
    description: 'ID del producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  product_id: string;

  @ApiProperty({
    description: 'ID del proveedor',
    example: '123e4567-e89b-12d3-a456-426614174001',
    type: String,
  })
  @IsUUID()
  provider_id: string;

  @ApiProperty({
    description: 'SKU del proveedor para este producto',
    example: 'PROV-SKU-12345',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  provider_sku?: string;

  @ApiProperty({
    description: 'Último precio de compra en USD',
    example: 299.99,
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  last_purchase_price?: number;
}
