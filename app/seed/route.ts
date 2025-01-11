import bcrypt from "bcrypt";
import { invoices, customers, revenue, users } from "../lib/placeholder-data";
import { db } from "@/db";
import { Customer, Invoice, Revenue, User } from "@/db/schema";
import { sql } from "drizzle-orm";

async function seedUsers() {
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return db.insert(User).values({
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
      });
    })
  );

  return insertedUsers;
}

async function seedInvoices() {
  //   (invoice) => client.sql`
  //   INSERT INTO invoices (customer_id, amount, status, date)
  //   VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
  //   ON CONFLICT (id) DO NOTHING;
  // `
  const insertedInvoices = await Promise.all(
    invoices.map((invoice) => {
      return db.insert(Invoice).values({
        customer_id: invoice.customer_id,
        amount: invoice.amount,
        status: sql`${invoice.status}::invoice_status`,
        date: invoice.date,
      });
    })
  );

  return insertedInvoices;
}

async function seedCustomers() {
  // `
  //       INSERT INTO customers (id, name, email, image_url)
  //       VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
  //       ON CONFLICT (id) DO NOTHING;
  //     `

  const insertedCustomers = await Promise.all(
    customers.map((customer) => {
      return db.insert(Customer).values({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
      });
    })
  );

  return insertedCustomers;
}

async function seedRevenue() {
  // (rev) => client.sql`
  //     INSERT INTO revenue (month, revenue)
  //     VALUES (${rev.month}, ${rev.revenue})
  //     ON CONFLICT (month) DO NOTHING;
  //   `
  const insertedRevenue = await Promise.all(
    revenue.map((rev) => {
      return db.insert(Revenue).values({
        month: rev.month,
        revenue: rev.revenue,
      });
    })
  );

  return insertedRevenue;
}

export async function GET() {
  try {
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
