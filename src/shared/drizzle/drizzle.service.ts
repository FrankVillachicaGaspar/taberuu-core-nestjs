import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './db/schema';

@Injectable()
export class DrizzleService implements OnModuleInit {
  private host?: string;
  private port?: number;
  private user?: string;
  private password?: string;
  private database?: string;
  private environment?: string;
  private db: PostgresJsDatabase<typeof schema>;

  constructor(private readonly configService: ConfigService) {
    this.host = configService.get<string>('dbHost');
    this.port = configService.get<number>('dbPort');
    this.user = configService.get<string>('dbUser');
    this.password = configService.get<string>('dbPassword');
    this.database = configService.get<string>('dbName');
    this.environment = configService.get<string>('nodeEnv');
  }

  async onModuleInit() {
    if (this.environment === 'DEVELOPMENT') {
      const client = postgres(
        `postgres://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`,
      );
      this.db = drizzle(client, { schema });
    }
  }

  getClient() {
    if (!this.db) throw new Error('Database is not initialized');

    return this.db;
  }
}
