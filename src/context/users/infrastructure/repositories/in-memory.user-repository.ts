import { UserRepository } from '@context/users/domain/user.repository';
import { PrimitiveUser, User } from '@context/users/domain/user';
import { EmailAlreadyExistException } from '../../domain/email-already-exist.exception';

export class InMemoryUserRepository extends UserRepository {
  private users: PrimitiveUser[] = [];

  async create(user: User): Promise<void> {
    const existUserByEmail = this.users.find(
      (user) => user.email === user.email,
    );

    if (existUserByEmail)
      throw new EmailAlreadyExistException(existUserByEmail.email);

    this.users.push(user.toValue());
  }

  async getById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    return user ? new User(user) : null;
  }
}
