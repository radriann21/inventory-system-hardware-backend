import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Procesadores',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descripción detallada de la categoría',
    example: 'Categoría para procesadores Intel y AMD',
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Estado de activación de la categoría',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  is_active: boolean;
}
