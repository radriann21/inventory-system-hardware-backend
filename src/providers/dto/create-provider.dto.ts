import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderDto {
  @ApiProperty({
    description: 'Nombre del proveedor',
    example: 'Tech Supplies Inc.',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Número de teléfono del proveedor',
    example: '+58-212-555-0101',
    type: String,
  })
  @IsString()
  phone_number: string;

  @ApiProperty({
    description: 'Nombre de la persona de contacto',
    example: 'Carlos Rodríguez',
    type: String,
  })
  @IsString()
  contact_name: string;

  @ApiProperty({
    description: 'Dirección física del proveedor',
    example: 'Av. Principal, Caracas',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;
}
