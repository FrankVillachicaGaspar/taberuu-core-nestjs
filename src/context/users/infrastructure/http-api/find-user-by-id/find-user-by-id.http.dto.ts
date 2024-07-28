import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindUserByIdHttpDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
