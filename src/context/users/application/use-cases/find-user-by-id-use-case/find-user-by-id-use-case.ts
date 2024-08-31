import { UserRepository } from '../../../domain/user.repository';
import { FindUsersByIdDto } from './find-user-by-id.dto';
import { Injectable } from '@nestjs/common';
import { UserResponse } from '../../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindUsersByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: FindUsersByIdDto): Promise<{ user: UserResponse }> {
    const user = await this.userRepository.getById(dto.id);

    return {
      user: plainToInstance(UserResponse, user.toValue(), {
        excludeExtraneousValues: true,
      }),
    };
  }
}
