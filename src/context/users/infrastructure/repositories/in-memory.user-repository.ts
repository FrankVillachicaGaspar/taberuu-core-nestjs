import { UserRepository } from '@context/users/domain/user.repository';
import { PrimitiveUser, User } from '@context/users/domain/user';

export class InMemoryUserRepository extends UserRepository {
  private users: PrimitiveUser[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user.toValue());
  }

  async getById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    return user ? new User(user) : null;
  }
}
