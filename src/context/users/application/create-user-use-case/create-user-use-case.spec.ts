import { CreateUserUseCase } from '@context/users/application/create-user-use-case/create-user-use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from '@context/users/infrastructure/http-api/create-user/create-user.controller';
import { UserRepository } from '@context/users/domain/user.repository';
import { CreateUserDto } from './create-user.dto';
import { User } from '../../domain/user';
import { EmailAlreadyExistException } from '../../domain/email-already-exist.exception';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('7bda974e-af05-4bc9-9bba-0d4827ed3861'),
}));

describe('CreateUserUseCase', () => {
  let service: CreateUserUseCase;
  let repository: DeepMocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: createMock<UserRepository>(),
        },
      ],
    }).compile();

    repository = module.get(UserRepository);
    service = module.get(CreateUserUseCase);
  });

  it('should create a user successfully', async () => {
    const userDto: CreateUserDto = {
      name: 'John',
      lastname: 'Doe',
      email: 'sample@sample.com',
      password: 'securePassword123',
      roleId: '7bda974e-af05-4bc9-9bba-0d4827ed3861',
    };

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
