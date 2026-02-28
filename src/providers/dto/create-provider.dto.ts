import { IsString, IsOptional } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  name: string;

  @IsString()
  phone_number: string;

  @IsString()
  contact_name: string;

  @IsString()
  @IsOptional()
  address?: string;
}
