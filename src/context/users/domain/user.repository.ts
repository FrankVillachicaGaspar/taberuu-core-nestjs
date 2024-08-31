import { CreateUserDto } from '../application/use-cases/create-user-use-case/create-user.dto';
import { User } from './user';

export abstract class UserRepository {
  abstract create(user: CreateUserDto): Promise<User>;

  abstract getById(id: string): Promise<User>;

  abstract findAll(limit: number, page: number): Promise<User[]>;

  abstract getTotalRecords(): Promise<number>;
}
