import { FindAllUsersController } from '@context/users/infrastructure/http-api/find-all-users/find-all-users.controller';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { FindAllUsersUseCase } from '@context/users/application/use-cases/find-all-users-use-case/find-all-users-use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { mockUsers } from '@context/users/infrastructure/http-api/__mock__/users.mock';
import { Pagination } from '@shared/interfaces/pagination.interface';
import { FindAllUsersDto } from '@context/users/application/use-cases/find-all-users-use-case/find-all-users.dto';
import { ApiResponse } from '@shared/models/api-response.model';
import { UserResponse } from '@context/users/application/dtos/user-response.dto';
import { PaginationError } from '@shared/errors/pagination.error';
import { PaginationEnum } from '@shared/enums/pagination.enum';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('FindAllUsersController', () => {
  let controller: FindAllUsersController;
  let mockService: DeepMocked<FindAllUsersUseCase>;

  beforeAll(async () => {
    mockService = createMock<FindAllUsersUseCase>();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindAllUsersController],
      providers: [
        {
          provide: FindAllUsersUseCase,
          useValue: createMock<FindAllUsersUseCase>(),
        },
      ],
    }).compile();

    controller = module.get(FindAllUsersController);
    mockService = module.get(FindAllUsersUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of users', async () => {
    const paginationMock: Pagination = {
      limit: 3,
      page: 1,
      next: 2,
      prev: null,
      total: 10,
      records: 30,
    };
    mockService.execute.mockResolvedValue({
      users: mockUsers,
      pagination: paginationMock,
    });

    const result = await controller.run({ limit: 3, page: 1 });

    expect(result).toEqual({
      data: mockUsers,
      meta: paginationMock,
      code: 200,
    } as ApiResponse<UserResponse[], Pagination>);

    expect(mockService.execute).toHaveBeenCalledWith({
      limit: 3,
      page: 1,
    } as FindAllUsersDto);
  });

  it('should return a bad request error when users are requests', async () => {
    const error = PaginationEnum.PAGINATION_ERROR;
    mockService.execute.mockRejectedValueOnce(new PaginationError(error));

    await expect(controller.run({ limit: 0, page: 0 })).rejects.toThrow(
      new BadRequestException(error),
    );

    expect(mockService.execute).toHaveBeenCalledWith({ limit: 0, page: 0 });
  });

  it('should return an internal server error when users are requests', async () => {
    const error = 'Find all users failed';
    mockService.execute.mockRejectedValueOnce(new Error(error));

    await expect(controller.run({ limit: 0, page: 0 })).rejects.toThrow(
      new InternalServerErrorException(error),
    );

    expect(mockService.execute).toHaveBeenCalledWith({ limit: 0, page: 0 });
  });
});
