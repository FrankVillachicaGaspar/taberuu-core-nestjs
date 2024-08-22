import { UserRepository } from '@context/users/domain/user.repository';
import { User } from '@context/users/domain/user';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DrizzleService } from '@src/shared/drizzle/drizzle.service';
import * as schema from '@src/shared/drizzle/db/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreateUserDto } from '../../application/create-user-use-case/create-user.dto';
import { eq } from 'drizzle-orm';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@Injectable()
export class PostgresUserRepository implements UserRepository, OnModuleInit {
  private db: PostgresJsDatabase<typeof schema>;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient();
  }

  async create(user: CreateUserDto): Promise<User> {
    const registeredUser = await this.db
      .insert(schema.users)
      .values(user)
      .returning();

    return new User(registeredUser[0]);
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });

    if (!user) throw new UserNotFoundException(id);

    return new User(user);
  }
}
