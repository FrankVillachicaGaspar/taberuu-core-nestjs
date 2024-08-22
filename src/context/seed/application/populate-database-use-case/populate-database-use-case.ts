import { Injectable } from '@nestjs/common';
import { SeedRepository } from '../../domain/seed.repository';
import { generateUsers } from '../../infrastructure/data/fake-data';
import { Roles } from '@src/shared/enums/roles.enum';

@Injectable()
export class PopulateDatabaseUseCase {
  constructor(private readonly seedRepository: SeedRepository) {}

  async execute(): Promise<void> {
    /* Clear database */
    await this.seedRepository.clearDatabase();

    /* Populate users table */
    const adminUsers = generateUsers(10, Roles.ADMIN, 'taberuuapp.com');
    await this.seedRepository.populateUsersTable(adminUsers);

    const restaurantOwnerUsers = generateUsers(
      10,
      Roles.RESTAURANT_OWNER,
      'outlook.com',
    );
    await this.seedRepository.populateUsersTable(restaurantOwnerUsers);

    const customerUsers = generateUsers(30, Roles.CUSTOMER, 'gmail.com');
    await this.seedRepository.populateUsersTable(customerUsers);
  }
}
