import { FindUserByIdController } from '@context/users/infrastructure/http-api/find-user-by-id/find-user-by-id.controller';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { FindUsersByIdUseCase } from '@context/users/application/use-cases/find-user-by-id-use-case/find-user-by-id-use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { findedUser } from '@context/users/infrastructure/http-api/__mock__/user.mock';
import { ApiResponse } from '@shared/models/api-response.model';
import { UserResponse } from '@context/users/application/dtos/user-response.dto';
import {
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserNotFoundException } from '@context/users/domain/errors/user-not-found.error';

describe('FindUserByIdController', () => {
  let controller: FindUserByIdController;
  let mockService: DeepMocked<FindUsersByIdUseCase>;

  const id: string = 'f6b8215d-da4c-4812-9b12-1b787072302c';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserByIdController],
      providers: [
        {
          provide: FindUsersByIdUseCase,
          useValue: createMock<FindUsersByIdUseCase>(),
        },
      ],
    }).compile();

    controller = module.get(FindUserByIdController);
    mockService = module.get(FindUsersByIdUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find a user successfully', async () => {
    mockService.execute.mockResolvedValueOnce({ user: findedUser });

    const result = await controller.run({ id });

    expect(result).toEqual({
      data: findedUser,
      code: HttpStatus.OK,
    } as ApiResponse<UserResponse, undefined>);

    expect(mockService.execute).toHaveBeenCalledWith({ id });
  });

  it('should handle a NotFoundException when user not found', async () => {
    mockService.execute.mockRejectedValueOnce(
      new UserNotFoundException(`user with id ${id} not found`),
    );

    await expect(controller.run({ id })).rejects.toThrow(NotFoundException);

    expect(mockService.execute).toHaveBeenCalledWith({ id });
  });

  it('should handle a InternalServerError when an unexpected error has occurred', async () => {
    mockService.execute.mockRejectedValueOnce(new Error('Unexpected error'));

    await expect(controller.run({ id })).rejects.toThrow(
      InternalServerErrorException,
    );

    expect(mockService.execute).toHaveBeenCalledWith({ id });
  });
});
