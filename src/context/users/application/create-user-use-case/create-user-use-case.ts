import { Injectable } from '@nestjs/common';
import { PrimitiveUser } from '../../domain/user';
import { CreateUserDto } from './create-user.dto';
import { UserRepository } from '@context/users/domain/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<{ user: PrimitiveUser }> {
    const user = await this.userRepository.create(dto);

    return {
      user: user.toValue(),
    };
  }
}
