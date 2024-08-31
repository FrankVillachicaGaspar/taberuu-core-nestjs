import { CreateUserHttpDto } from '@context/users/infrastructure/http-api/create-user/create-user.http-dto';
import { Roles } from '@shared/enums/roles.enum';
import { UserResponse } from '@context/users/application/dtos/user-response.dto';

export const mockUser: CreateUserHttpDto = {
  name: 'Pedro',
  lastname: 'Cavero',
  email: 'sample@email.com',
  password: 'securepassword123',
  role: Roles.RESTAURANT_OWNER,
};

export const findedUser: UserResponse = {
  id: 'f6b8215d-da4c-4812-9b12-1b787072302c',
  name: 'Pedro',
  lastname: 'Cavero',
  email: 'sample@email.com',
  role: Roles.RESTAURANT_OWNER,
  phoneNumber: null,
  profileImage: null,
  phoneCode: null,
  createdAt: new Date(),
  updatedAt: null,
};
