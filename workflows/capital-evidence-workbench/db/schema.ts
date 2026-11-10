import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const workspace = sqliteTable('workspace', { id: text('id').primaryKey(), data: text('data').notNull(), revision: integer('revision').notNull().default(1) });
export const attachments = sqliteTable('attachments', { id:text('id').primaryKey(), name:text('name').notNull(), mime:text('mime').notNull(), size:integer('size').notNull(), sha:text('sha').notNull(), source:text('source').notNull(), created:text('created').notNull(), version:text('version').notNull() });
export const preferences = sqliteTable('preferences', { id:text('id').primaryKey(), data:text('data').notNull(), updated:text('updated').notNull() });
