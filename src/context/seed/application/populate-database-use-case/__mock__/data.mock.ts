import { CreateUserDto } from '@src/context/users/application/use-cases/create-user-use-case/create-user.dto';
import { Roles } from '@shared/enums/roles.enum';

export const fakeAdminUsers: CreateUserDto[] = [
  {
    name: 'John',
    lastname: 'Doe',
    email: 'sample@sample.com',
    password: 'securePassword123',
    role: Roles.ADMIN,
  },
  {
    name: 'John',
    lastname: 'Doe',
    email: 'sample@sample.com',
    password: 'securePassword123',
    role: Roles.ADMIN,
  },
];

export const fakeRestaurantOwnerUsers: CreateUserDto[] = [
  {
    name: 'John',
    lastname: 'Doe',
    email: 'sample@sample.com',
    password: 'securePassword123',
    role: Roles.RESTAURANT_OWNER,
  },
  {
    name: 'John',
    lastname: 'Doe',
    email: 'sample@sample.com',
    password: 'securePassword123',
    role: Roles.RESTAURANT_OWNER,
  },
];

export const fakeCustomerUsers: CreateUserDto[] = [
  {
    name: 'John',
    lastname: 'Doe',
    email: 'sample@sample.com',
    password: 'securePassword123',
    role: Roles.CUSTOMER,
  },
  {
    name: 'John',
    lastname: 'Doe',
    email: 'sample@sample.com',
    password: 'securePassword123',
    role: Roles.CUSTOMER,
  },
];
