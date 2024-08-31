import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserRepository } from '@context/users/domain/user.repository';
import { UserResponse } from '../../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<{ user: UserResponse }> {
    const user = await this.userRepository.create(dto);

    return {
      user: plainToInstance(UserResponse, user.toValue()),
    };
  }
}
