import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'John',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Doe',
    type: String,
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'johndoe',
    type: String,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    example: 'password123',
    minLength: 6,
    type: String,
  })
  @MinLength(6)
  password: string;
}
