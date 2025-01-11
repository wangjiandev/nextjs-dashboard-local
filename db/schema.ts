import { sql } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const User = pgTable("users", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const InvoiceStatus = pgEnum("invoice_status", ["pending", "paid"]);

export const Invoice = pgTable("invoices", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  customer_id: uuid("customer_id")
    .notNull()
    .references(() => Customer.id),
  amount: integer("amount").notNull(),
  status: InvoiceStatus("status").notNull().default("pending"),
  date: date("date").notNull(),
});

export const invoiceRelations = relations(Invoice, ({ one }) => ({
  customer: one(Customer, {
    fields: [Invoice.customer_id],
    references: [Customer.id],
  }),
}));

export const Customer = pgTable("customers", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  image_url: varchar("image_url", { length: 255 }).notNull(),
});

export const customerRelations = relations(Customer, ({ many }) => ({
  invoices: many(Invoice),
}));

export const Revenue = pgTable("revenue", {
  month: varchar("month", { length: 4 }).notNull().unique(),
  revenue: integer("revenue").notNull(),
});
