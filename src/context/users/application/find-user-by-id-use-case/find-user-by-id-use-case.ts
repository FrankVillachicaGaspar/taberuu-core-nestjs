import { UserRepository } from '../../domain/user.repository';
import { FindUsersByIdDto } from './find-user-by-id.dto';
import { PrimitiveUser } from '../../domain/user';
import { Injectable } from '@shared/dependency-injection/injectable';
import { UserNotFoundException } from '../../domain/user-not-found.exception';

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
