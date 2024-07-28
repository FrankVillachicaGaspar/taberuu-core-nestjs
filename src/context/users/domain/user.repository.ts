import { User } from './user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;

  abstract getById(id: string): Promise<User | null>;
}
