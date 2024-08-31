import { DrizzleService } from '@src/shared/drizzle/drizzle.service';
import { SeedRepository } from '../../domain/seed.repository';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as schema from '@src/shared/drizzle/db/schema';
import { CreateUserDto } from '@src/context/users/application/use-cases/create-user-use-case/create-user.dto';

@Injectable()
export class PostgresSeedRepository implements SeedRepository, OnModuleInit {
  private db: PostgresJsDatabase<typeof schema>;
  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient();
  }

  async clearDatabase(): Promise<void> {
    await this.db.delete(schema.users);
  }

  async populateUsersTable(users: CreateUserDto[]): Promise<void> {
    await this.db.insert(schema.users).values(users);
  }
}
