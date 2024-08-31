import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { FindAllUsersUseCase } from './find-all-users-use-case';
import { UserRepository } from '@src/context/users/domain/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { users } from './__mock__/data.mock';
import { plainToInstance } from 'class-transformer';
import { UserResponse } from '../../dtos/user-response.dto';
import { PaginationError } from '@src/shared/errors/pagination.error';

describe('FindAllUsersUseCase', () => {
  let service: FindAllUsersUseCase;
  let mockRepository: DeepMocked<UserRepository>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllUsersUseCase,
        {
          provide: UserRepository,
          useValue: createMock<UserRepository>(),
        },
      ],
    }).compile();

    service = module.get(FindAllUsersUseCase);
    mockRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users successfully', async () => {
    mockRepository.getTotalRecords.mockResolvedValueOnce(Promise.resolve(50));
    mockRepository.findAll.mockResolvedValueOnce(Promise.resolve(users));

    const result = await service.execute({ limit: 10, page: 1 });

    expect(mockRepository.findAll).toHaveBeenCalledWith(10, 1);

    expect(result.users).toEqual(
      users.map((user) =>
        plainToInstance(UserResponse, user.toValue(), {
          excludeExtraneousValues: true,
        }),
      ),
    );
  });

  it('should return an error when page is less than 1', async () => {
    mockRepository.getTotalRecords.mockResolvedValueOnce(Promise.resolve(50));

    await expect(service.execute({ limit: 10, page: 0 })).rejects.toThrow(
      PaginationError,
    );
  });
});
