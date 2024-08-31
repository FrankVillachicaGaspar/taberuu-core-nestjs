import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdController } from '@src/context/users/infrastructure/http-api/find-user-by-id/find-user-by-id.controller';
import { FindUsersByIdUseCase } from './find-user-by-id-use-case';
import { UserRepository } from '@src/context/users/domain/user.repository';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Roles } from '@shared/enums/roles.enum';
import { User } from '@src/context/users/domain/user';
import { plainToInstance } from 'class-transformer';
import { UserResponse } from '../../dtos/user-response.dto';
import { UserNotFoundException } from '@src/context/users/domain/errors/user-not-found.error';

describe('FindUserByIdUseCase', () => {
  let mockRepository: DeepMocked<UserRepository>;
  let service: FindUsersByIdUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserByIdController],
      providers: [
        FindUsersByIdUseCase,
        {
          provide: UserRepository,
          useValue: createMock<UserRepository>(),
        },
      ],
    }).compile();

    mockRepository = module.get(UserRepository);
    service = module.get(FindUsersByIdUseCase);
  });

  it('should find a user successfully', async () => {
    const id = '1e83bda2-cb0f-436d-9544-50c2c495f8d7';

    const foundUser = new User({
      id,
      name: 'John',
      lastname: 'Doe',
      email: 'sample@sample.com',
      password: 'securePassword123',
      role: Roles.CUSTOMER,
      profileImage: null,
      phoneNumber: null,
      phoneCode: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    mockRepository.getById.mockResolvedValueOnce(Promise.resolve(foundUser));

    const result = await service.execute({ id });

    expect(mockRepository.getById).toHaveBeenCalledWith(id);

    expect(result.user).toEqual(
      plainToInstance(UserResponse, foundUser.toValue(), {
        excludeExtraneousValues: true,
      }),
    );
  });

  it('should throw an error if user not found', async () => {
    const id = '1e83bda2-cb0f-436d-9544-50c2c495f8d7';

    mockRepository.getById.mockRejectedValueOnce(new UserNotFoundException(id));

    expect(service.execute({ id })).rejects.toThrow(UserNotFoundException);

    expect(mockRepository.getById).toHaveBeenCalledWith(id);
  });
});
