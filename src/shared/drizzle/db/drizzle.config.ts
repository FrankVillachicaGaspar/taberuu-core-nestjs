import { Config, defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/shared/drizzle/db/schema.ts',
  out: './src/shared/drizzle/db/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
  },
  migrations: {
    table: 'drizzle_migrations',
  },
} as Config);
