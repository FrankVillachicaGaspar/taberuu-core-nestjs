import { PrimitiveUser, User } from '../../domain/user';
import { CreateUserDto } from './create-user.dto';
import { Injectable } from '@shared/dependency-injection/injectable';
import { UserRepository } from '@context/users/domain/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<{ user: PrimitiveUser }> {
    const user = User.create(dto);

    await this.userRepository.create(user);

    return {
      user: user.toValue(),
    };
  }
}
