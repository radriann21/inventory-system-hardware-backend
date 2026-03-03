import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeasureDto {
  @ApiProperty({
    description: 'Nombre de la unidad de medida',
    example: 'Unidad',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Abreviación de la unidad de medida',
    example: 'Und',
    type: String,
  })
  @IsString()
  abbreviation: string;

  @ApiProperty({
    description: 'Estado de activación de la unidad de medida',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  is_active: boolean;
}
