import { Expose } from 'class-transformer';
import { Roles } from '@shared/enums/roles.enum';

export class UserResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  lastname: string;

  @Expose()
  email: string;

  @Expose()
  profileImage: string | null;

  @Expose()
  phoneNumber: string | null;

  @Expose()
  phoneCode: string | null;

  @Expose()
  role: Roles;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;
}
