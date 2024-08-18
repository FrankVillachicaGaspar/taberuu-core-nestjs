import { CreateUserUseCase } from '@context/users/application/create-user-use-case/create-user-use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from '@context/users/infrastructure/http-api/create-user/create-user.controller';
import { UserRepository } from '@context/users/domain/user.repository';
import { CreateUserDto } from './create-user.dto';
import { User } from '../../domain/user';
import { v4 as uuid } from 'uuid';
import { EmailAlreadyExistException } from '../../domain/email-already-exist.exception';

jest.mock('uuid');

describe('CreateUserUseCase', () => {
  let service: CreateUserUseCase;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get(UserRepository) as jest.Mocked<UserRepository>;
    service = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should create a user successfully', async () => {
    const userDto: CreateUserDto = {
      name: 'John',
      lastname: 'Doe',
      email: 'sample@sample.com',
      password: 'securePassword123',
      roleId: '7bda974e-af05-4bc9-9bba-0d4827ed3861',
    };

    const mockUuid = '034fe5dd-8f7c-43dd-a082-d9f7b3822d2e';

    (uuid as jest.Mock).mockReturnValue(mockUuid);

    const createdUser = User.create(userDto);

    repository.create.mockResolvedValueOnce();

    const result = await service.execute(userDto);

    expect(repository.create).toHaveBeenCalledWith(createdUser);

    expect(result.user).toEqual(createdUser.toValue());
  });

  it('should return error if user with email already exist', async () => {
    const userDto: CreateUserDto = {
      name: 'John',
      lastname: 'Doe',
      email: 'sample@sample.com',
      password: 'securePassword123',
      roleId: '7bda974e-af05-4bc9-9bba-0d4827ed3861',
    };

    const mockUuid = '034fe5dd-8f7c-43dd-a082-d9f7b3822d2e';
    (uuid as jest.Mock).mockReturnValue(mockUuid);

    const createdUser = User.create(userDto);

    repository.create.mockRejectedValueOnce(() => {
      throw new EmailAlreadyExistException(createdUser.toValue().email);
    });

    await expect(service.execute(userDto)).rejects.toThrow(
      EmailAlreadyExistException,
    );

    expect(repository.create).toHaveBeenCalledWith(createdUser);
  });
});
