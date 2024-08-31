import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { UserResponse } from '@src/context/users/application/dtos/user-response.dto';
import { FindAllUsersUseCase } from '@src/context/users/application/use-cases/find-all-users-use-case/find-all-users-use-case';
import { PaginationQueryDto } from '@src/shared/dtos/pagination.http.dto';
import { PaginationError } from '@src/shared/errors/pagination.error';
import { Pagination } from '@src/shared/interfaces/pagination.interface';
import { ApiResponse } from '@src/shared/models/api-response.model';

@Controller('user')
export class FindAllUsersController {
  constructor(private readonly findAllUsersUseCase: FindAllUsersUseCase) {}

  @Get()
  async run(
    @Query() dto: PaginationQueryDto,
  ): Promise<ApiResponse<UserResponse[], Pagination>> {
    try {
      const res = await this.findAllUsersUseCase.execute({
        limit: dto.limit,
        page: dto.page,
      });

      return {
        data: res.users,
        meta: res.pagination,
        code: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof PaginationError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
