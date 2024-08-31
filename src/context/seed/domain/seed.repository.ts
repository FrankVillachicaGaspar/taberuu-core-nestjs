import { CreateUserDto } from '@src/context/users/application/use-cases/create-user-use-case/create-user.dto';

export abstract class SeedRepository {
  abstract clearDatabase(): Promise<void>;
  abstract populateUsersTable(users: CreateUserDto[]): Promise<void>;
}
