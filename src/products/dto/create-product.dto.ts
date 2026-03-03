import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  internal_sku: string;

  @IsString()
  price_usd: string;

  @IsNumber()
  actual_stock: number;

  @IsNumber()
  min_stock: number;

  @IsString()
  brand: string;

  @IsBoolean()
  is_active: boolean;

  @IsNumber()
  measure_id: number;

  @IsNumber()
  category_id: number;

  @IsNumber()
  tax_percentage: number;
}
