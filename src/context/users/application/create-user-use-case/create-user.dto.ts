import { Roles } from '@src/shared/enums/roles.enum';

export class CreateUserDto {
  name: string;
  lastname: string;
  email: string;
  password: string;
  profileImage?: string;
  phoneNumber?: string;
  phoneCode?: string;
  role: Roles;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
