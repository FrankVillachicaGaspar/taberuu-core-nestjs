import { UserRepository } from '@context/users/domain/user.repository';
import { User } from '@context/users/domain/user';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DrizzleService } from '@src/shared/drizzle/drizzle.service';
import * as schema from '@src/shared/drizzle/db/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreateUserDto } from '../../application/use-cases/create-user-use-case/create-user.dto';
import { eq, sql } from 'drizzle-orm';
import { UserNotFoundException } from '../../domain/errors/user-not-found.error';
import { calculateOffset } from '@src/shared/utils/pagination';
import { EmailAlreadyExistException } from '../../domain/errors/email-already-exist.error';

@Injectable()
export class PostgresUserRepository implements UserRepository, OnModuleInit {
  private db: PostgresJsDatabase<typeof schema>;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient();
  }

  private async getByEmail(email: string): Promise<User | null> {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    return user ? new User(user) : null;
  }

  async getTotalRecords(): Promise<number> {
    const res = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(schema.users);

    return res[0].count;
  }

  async create(user: CreateUserDto): Promise<User> {
    const existUserByEmail = await this.getByEmail(user.email);

    if (existUserByEmail) throw new EmailAlreadyExistException(user.email);

    const registeredUser = await this.db
      .insert(schema.users)
      .values(user)
      .returning();

    return new User(registeredUser[0]);
  }

  async getById(id: string): Promise<User> {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });

    if (!user) throw new UserNotFoundException(id);

    return new User(user);
  }

  async findAll(limit: number, page: number): Promise<User[]> {
    const offset = calculateOffset(limit, page);

    const users = await this.db.query.users.findMany({
      limit,
      offset,
    });

    return users.map((user) => new User(user));
  }
}
