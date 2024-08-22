import { UserRepository } from '../../domain/user.repository';
import { FindUsersByIdDto } from './find-user-by-id.dto';
import { PrimitiveUser } from '../../domain/user';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUsersByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: FindUsersByIdDto): Promise<{ user: PrimitiveUser }> {
    const user = await this.userRepository.getById(dto.id);

    if (!user) {
      throw new UserNotFoundException(dto.id);
    }

    return {
      user: user.toValue(),
    };
  }
}
