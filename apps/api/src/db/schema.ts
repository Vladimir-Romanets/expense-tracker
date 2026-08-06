import {
  pgTable,
  serial,
  varchar,
  timestamp,
  uniqueIndex,
  integer,
  date,
  numeric,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const users = pgTable('users', {
  id: serial().primaryKey(),
  firstName: varchar('first_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  email: varchar({ length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const stores = pgTable(
  'stores',
  {
    id: serial().primaryKey(),
    name: varchar({ length: 100 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => [uniqueIndex('stores_name_unique_idx').on(sql`lower(${table.name})`)],
)

export const categories = pgTable(
  'categories',
  {
    id: serial().primaryKey(),
    name: varchar({ length: 100 }).notNull(),
  },
  (table) => [uniqueIndex('categories_name_unique_idx').on(sql`lower(${table.name})`)],
)

export const products = pgTable('products', {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull().unique(),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const receipts = pgTable('receipts', {
  id: serial().primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  storeId: integer('store_id')
    .notNull()
    .references(() => stores.id),
  purchaseDate: date('purchase_date').notNull(),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  photoUrl: varchar('photo_url', { length: 500 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const receiptItems = pgTable('receipt_items', {
  id: serial().primaryKey(),
  receiptId: integer('receipt_id')
    .notNull()
    .references(() => receipts.id, { onDelete: 'cascade' }),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  quantity: numeric({ precision: 10, scale: 3 }),
  unitPrice: numeric('unit_price', { precision: 10, scale: 3 }),
  totalPrice: numeric('total_price', { precision: 10, scale: 3 }).notNull(),
})

export type StoreProps = typeof stores.$inferSelect
export type NewStoreProps = typeof stores.$inferInsert
export type CategoryProps = typeof categories.$inferSelect
export type NewCategoryProps = typeof categories.$inferInsert
export type ProductProps = typeof products.$inferSelect
export type NewProductProps = typeof products.$inferInsert
export type ReceiptProps = typeof receipts.$inferSelect
export type NewReceiptProps = typeof receipts.$inferInsert
export type ReceiptItemProps = typeof receiptItems.$inferSelect
export type NewReceiptItemProps = typeof receiptItems.$inferInsert
