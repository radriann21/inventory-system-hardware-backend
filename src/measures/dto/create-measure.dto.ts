import { IsString, IsBoolean } from 'class-validator';

export class CreateMeasureDto {
  @IsString()
  name: string;

  @IsString()
  abbreviation: string;

  @IsBoolean()
  is_active: boolean;
}
