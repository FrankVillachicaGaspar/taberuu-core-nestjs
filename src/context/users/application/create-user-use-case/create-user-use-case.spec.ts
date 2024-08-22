import { CreateUserUseCase } from '@context/users/application/create-user-use-case/create-user-use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from '@context/users/infrastructure/http-api/create-user/create-user.controller';
import { UserRepository } from '@context/users/domain/user.repository';
import { CreateUserDto } from './create-user.dto';
import { User } from '../../domain/user';
import { EmailAlreadyExistException } from '../../domain/exceptions/email-already-exist.exception';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Roles } from '@src/shared/enums/roles.enum';

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
      role: Roles.CUSTOMER,
    };

    const createdUser = new User({
      ...userDto,
      id: '1e83bda2-cb0f-436d-9544-50c2c495f8d7',
      profileImage: null,
      phoneNumber: null,
      phoneCode: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    repository.create.mockResolvedValueOnce(Promise.resolve(createdUser));

    const result = await service.execute(userDto);

    expect(repository.create).toHaveBeenCalledWith(userDto);

    expect(result.user).toEqual(createdUser.toValue());
  });

  it('should return error if user with email already exist', async () => {
    const userDto: CreateUserDto = {
      name: 'John',
      lastname: 'Doe',
      email: 'sample@sample.com',
      password: 'securePassword123',
      role: Roles.CUSTOMER,
    };

    repository.create.mockRejectedValueOnce(() => {
      throw new EmailAlreadyExistException(userDto.email);
    });

    await expect(service.execute(userDto)).rejects.toThrow(
      EmailAlreadyExistException,
    );

    expect(repository.create).toHaveBeenCalledWith(userDto);
  });
});
