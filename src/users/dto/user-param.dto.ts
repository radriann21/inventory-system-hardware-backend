import { IsUUID } from 'class-validator';

export class UserParamDTO {
  @IsUUID('4')
  id: string;
}
