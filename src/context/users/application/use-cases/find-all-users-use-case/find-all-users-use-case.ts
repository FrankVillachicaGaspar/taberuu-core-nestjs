import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/user.repository';
import pagination from '@src/shared/utils/pagination';
import { Pagination } from '@src/shared/interfaces/pagination.interface';
import { UserResponse } from '../../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { FindAllUsersDto } from './find-all-users.dto';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ limit, page }: FindAllUsersDto): Promise<{
    users: UserResponse[];
    pagination: Pagination;
  }> {
    const users = await this.userRepository.findAll(limit, page);
    const totalRecords = await this.userRepository.getTotalRecords();

    const paginationInfo = pagination(limit, page, totalRecords);

    const usersResponse = users.map((user) =>
      plainToInstance(UserResponse, user.toValue(), {
        excludeExtraneousValues: true,
      }),
    );

    return {
      users: usersResponse,
      pagination: paginationInfo,
    };
  }
}
