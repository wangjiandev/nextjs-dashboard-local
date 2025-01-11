CREATE TYPE "public"."invoice_status" AS ENUM('pending', 'paid');--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"image_url" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"customer_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"status" "invoice_status" DEFAULT 'pending' NOT NULL,
	"date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "revenue" (
	"month" varchar(4) NOT NULL,
	"revenue" integer NOT NULL,
	CONSTRAINT "revenue_month_unique" UNIQUE("month")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;