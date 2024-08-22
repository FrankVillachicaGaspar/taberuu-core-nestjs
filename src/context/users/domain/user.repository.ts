import { CreateUserDto } from '../application/create-user-use-case/create-user.dto';
import { User } from './user';

export abstract class UserRepository {
  abstract create(user: CreateUserDto): Promise<User>;

  abstract getById(id: string): Promise<User | null>;
}
