import { relations } from 'drizzle-orm';
import {
  boolean,
  char,
  pgSchema,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const taberuuSchema = pgSchema('dbo');
/* Roles enum */
export const roles = taberuuSchema.enum('roles', [
  'RESTAURANT_OWNER',
  'MENU_EDITOR',
  'SUPERVISOR',
  'ADMIN',
  'CUSTOMER',
  'DELIVERY_DRIVER',
]);

/* Days enum */
export const days = taberuuSchema.enum('days', [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]);

/* User */
export const users = taberuuSchema.table('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  lastname: varchar('lastname', { length: 100 }).notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  profileImage: text('profile_image'),
  phoneNumber: char('phone_number', { length: 15 }),
  phoneCode: char('phone_code', { length: 10 }),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  }),
  deletedAt: timestamp('deleted_at', {
    withTimezone: true,
    mode: 'date',
  }),
  role: roles('role').notNull(),
});

/* Restaurants */
export const restaurants = taberuuSchema.table('restaurants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description').notNull(),
  logoImage: text('logo_image'),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  }).defaultNow(),
  deletedAt: timestamp('deleted_at', {
    withTimezone: true,
    mode: 'date',
  }),
  ownerId: uuid('owner_id').notNull(),
});

export const restaurantsRelations = relations(restaurants, ({ one }) => ({
  owner: one(users, {
    fields: [restaurants.ownerId],
    references: [users.id],
  }),
}));

/* Establishments */
export const establishments = taberuuSchema.table('establishments', {
  id: uuid('id').primaryKey().defaultRandom(),
  alias: varchar('alias', { length: 100 }).notNull(),
  address: varchar('address', { length: 200 }).notNull(),
  reference: varchar('reference', { length: 100 }).notNull(),
  status: boolean('status').notNull().default(false),
  automaticStatus: boolean('automatic_status').notNull().default(false),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  }).defaultNow(),
  deletedAt: timestamp('deleted_at', {
    withTimezone: true,
    mode: 'date',
  }),
  restaurantId: uuid('restaurant_id').notNull(),
});

export const establishmentsRelations = relations(establishments, ({ one }) => ({
  restaurant: one(restaurants, {
    fields: [establishments.restaurantId],
    references: [restaurants.id],
  }),
}));

/* Schedules */
export const schedules = taberuuSchema.table('schedules', {
  id: uuid('id').primaryKey().defaultRandom(),
  day: days('day').notNull(),
  openTime: timestamp('open_time', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  closeTime: timestamp('close_time', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  }).defaultNow(),
  deletedAt: timestamp('deleted_at', {
    withTimezone: true,
    mode: 'date',
  }),
  establishmentId: uuid('establishment_id').notNull(),
});

export const scheduleRelations = relations(schedules, ({ one }) => ({
  establishment: one(establishments, {
    fields: [schedules.establishmentId],
    references: [establishments.id],
  }),
}));
