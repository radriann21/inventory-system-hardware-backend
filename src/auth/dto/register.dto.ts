import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsEmail()
  username: string;

  @MinLength(6)
  password: string;
}
