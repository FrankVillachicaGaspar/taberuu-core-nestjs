import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { SeedRepository } from '../../domain/seed.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PopulateDatabaseUseCase } from './populate-database-use-case';
import {
  fakeAdminUsers,
  fakeCustomerUsers,
  fakeRestaurantOwnerUsers,
} from './__mock__/data.mock';
import { generateUsers } from '@src/shared/data/fake-data';
import { Roles } from '@shared/enums/roles.enum';

jest.mock('@src/shared/data/fake-data', () => ({
  generateUsers: jest.fn(),
}));

describe('PopulateDatabaseUseCase', () => {
  let service: PopulateDatabaseUseCase;
  let mockRepository: DeepMocked<SeedRepository>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PopulateDatabaseUseCase,
        {
          provide: SeedRepository,
          useValue: createMock<SeedRepository>(),
        },
      ],
    }).compile();

    service = module.get(PopulateDatabaseUseCase);
    mockRepository = module.get(SeedRepository);
  });

  it('should populate database successfully', async () => {
    mockRepository.clearDatabase.mockResolvedValueOnce();

    (generateUsers as jest.Mock)
      .mockReturnValueOnce(fakeAdminUsers)
      .mockReturnValueOnce(fakeRestaurantOwnerUsers)
      .mockReturnValueOnce(fakeCustomerUsers);

    mockRepository.populateUsersTable.mockResolvedValueOnce();
    mockRepository.populateUsersTable.mockResolvedValueOnce();
    mockRepository.populateUsersTable.mockResolvedValueOnce();

    await service.execute();

    expect(mockRepository.clearDatabase).toHaveBeenCalled();

    expect(mockRepository.populateUsersTable).toHaveBeenCalledWith(
      fakeAdminUsers,
    );

    expect(mockRepository.populateUsersTable).toHaveBeenCalledWith(
      fakeRestaurantOwnerUsers,
    );

    expect(mockRepository.populateUsersTable).toHaveBeenCalledWith(
      fakeCustomerUsers,
    );

    expect(generateUsers).toHaveBeenCalledWith(
      10,
      Roles.ADMIN,
      'taberuuapp.com',
    );

    expect(generateUsers).toHaveBeenCalledWith(
      10,
      Roles.RESTAURANT_OWNER,
      'outlook.com',
    );

    expect(generateUsers).toHaveBeenCalledWith(30, Roles.CUSTOMER, 'gmail.com');

    expect(generateUsers).toHaveBeenCalledTimes(3);
  });

  it('should throw an error if clear database fails', async () => {
    mockRepository.clearDatabase.mockRejectedValueOnce(new Error());

    await expect(service.execute()).rejects.toThrow();
    expect(mockRepository.clearDatabase).toHaveBeenCalled();
  });

  it('should throw an error if populate users table fails', async () => {
    mockRepository.clearDatabase.mockResolvedValueOnce();

    (generateUsers as jest.Mock).mockReturnValueOnce(fakeAdminUsers);

    mockRepository.populateUsersTable.mockRejectedValueOnce(new Error());

    await expect(service.execute()).rejects.toThrow();
    expect(mockRepository.clearDatabase).toHaveBeenCalled();
    expect(mockRepository.populateUsersTable).toHaveBeenCalledWith(
      fakeAdminUsers,
    );
  });

  it('should use all enum values', () => {
    (generateUsers as jest.Mock)
      .mockReturnValueOnce(fakeAdminUsers)
      .mockReturnValueOnce(fakeAdminUsers)
      .mockReturnValueOnce(fakeAdminUsers)
      .mockReturnValueOnce(fakeAdminUsers)
      .mockReturnValueOnce(fakeAdminUsers)
      .mockReturnValueOnce(fakeAdminUsers);

    const admins = generateUsers(10, Roles.ADMIN, 'email.com');
    const customers = generateUsers(10, Roles.CUSTOMER, 'email.com');
    const delivery = generateUsers(10, Roles.DELIVERY_DRIVER, 'email.com');
    const menu = generateUsers(10, Roles.MENU_EDITOR, 'email.com');
    const restaurant = generateUsers(10, Roles.RESTAURANT_OWNER, 'email.com');
    const supervisor = generateUsers(10, Roles.SUPERVISOR, 'email.com');

    expect(admins).toBe(fakeAdminUsers);
    expect(customers).toBe(fakeAdminUsers);
    expect(delivery).toBe(fakeAdminUsers);
    expect(menu).toBe(fakeAdminUsers);
    expect(restaurant).toBe(fakeAdminUsers);
    expect(supervisor).toBe(fakeAdminUsers);
  });
});
