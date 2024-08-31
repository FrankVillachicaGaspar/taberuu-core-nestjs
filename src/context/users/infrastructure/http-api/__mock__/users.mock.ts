import { UserResponse } from '@context/users/application/dtos/user-response.dto';
import { Roles } from '@shared/enums/roles.enum';

export const mockUsers: UserResponse[] = [
  {
    id: '1d34ad21-a339-4ce1-b830-58480e114396',
    name: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    profileImage: null,
    phoneCode: null,
    phoneNumber: null,
    role: Roles.RESTAURANT_OWNER,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'c8e3736b-5fd9-4b89-9507-e11c556b5c9d',
    name: 'Peter',
    lastname: 'Castle',
    email: 'peter.caste@example.com',
    profileImage: null,
    phoneCode: null,
    phoneNumber: null,
    role: Roles.RESTAURANT_OWNER,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'b2ea66d5-f994-45d6-8e8b-b3e3d7a7f9d2',
    name: 'Dina',
    lastname: 'Boloarte',
    email: 'rolex.lover@example.com',
    profileImage: null,
    phoneCode: null,
    phoneNumber: null,
    role: Roles.RESTAURANT_OWNER,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
