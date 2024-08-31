import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CreateUserUseCase } from '@context/users/application/use-cases/create-user-use-case/create-user-use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from '@context/users/infrastructure/http-api/create-user/create-user.controller';
import { User } from '@context/users/domain/user';
import { mockUser } from '@context/users/infrastructure/http-api/__mock__/user.mock';
import { plainToInstance } from 'class-transformer';
import { UserResponse } from '@context/users/application/dtos/user-response.dto';
import { EmailAlreadyExistException } from '@context/users/domain/errors/email-already-exist.error';
import { InternalServerErrorException } from '@nestjs/common';

describe('CreateUserController', () => {
  let controller: CreateUserController;
  let mockService: DeepMocked<CreateUserUseCase>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: createMock<CreateUserUseCase>(),
        },
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
    mockService = module.get(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user successfully', async () => {
    const user: User = new User({
      id: '674ab82d-7cd2-48bc-880b-34234c5fd74b',
      ...mockUser,
      profileImage: null,
      phoneNumber: null,
      phoneCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const userResponse = plainToInstance(UserResponse, user.toValue(), {
      excludeExtraneousValues: true,
    });

    mockService.execute.mockResolvedValueOnce({ user: userResponse });

    const result = await controller.run(mockUser);

    expect(result.user).toEqual(userResponse);
    expect(mockService.execute).toHaveBeenCalledWith(mockUser);
  });

  it('should handle email already exist error when creating user', async () => {
    const error = new EmailAlreadyExistException(mockUser.email);

    mockService.execute.mockRejectedValueOnce(error);

    await expect(controller.run(mockUser)).rejects.toThrow(error);

    expect(mockService.execute).toHaveBeenCalledWith(mockUser);
  });

  it('should handle internal server exception error when creating user', async () => {
    const error = new InternalServerErrorException('Mock Error');
    mockService.execute.mockRejectedValueOnce(error);

    await expect(controller.run(mockUser)).rejects.toThrow(error);

    expect(mockService.execute).toHaveBeenCalledWith(mockUser);
  });
});
