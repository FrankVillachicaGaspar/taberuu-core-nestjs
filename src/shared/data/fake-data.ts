import { faker } from '@faker-js/faker';
import { CreateUserDto } from '@src/context/users/application/use-cases/create-user-use-case/create-user.dto';
import { Roles } from '@shared/enums/roles.enum';

/**
 * Generates an array of fake user data.
 *
 * @param {number} count - The number of users to generate.
 * @param {String} role - The role of the users to generate.
 * @param {string} [emailProvider] - The email provider to use for the generated users.
 * @return {CreateUserDto[]} An array of fake user data.
 */
export function generateUsers(
  count: number,
  role: Roles,
  emailProvider?: string,
): CreateUserDto[] {
  const users: CreateUserDto[] = [];

  for (let i = 0; i < count; i++) {
    users.push({
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email({ provider: emailProvider ?? 'gmail.com' }),
      password: faker.internet.password(),
      role: role,
      profileImage: faker.image.avatarGitHub(),
    });
  }

  return users;
}
