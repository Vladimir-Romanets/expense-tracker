CREATE TABLE "categories" (
	"id" serial PRIMARY KEY,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"category_id" integer,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "receipt_items" (
	"id" serial PRIMARY KEY,
	"receipt_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" numeric(10,3),
	"unit_price" numeric(10,3),
	"total_price" numeric(10,3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "receipts" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"store_id" integer NOT NULL,
	"purchase_date" date NOT NULL,
	"total_amount" numeric(10,2) NOT NULL,
	"photo_url" varchar(500),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stores" (
	"id" serial PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"password_hash" varchar(255) NOT NULL,
	"email" varchar(100) NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX "categories_name_unique_idx" ON "categories" (lower("name"));--> statement-breakpoint
CREATE UNIQUE INDEX "products_name_unique_idx" ON "products" (lower("name"));--> statement-breakpoint
CREATE UNIQUE INDEX "stores_name_unique_idx" ON "stores" (lower("name"));--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id");--> statement-breakpoint
ALTER TABLE "receipt_items" ADD CONSTRAINT "receipt_items_receipt_id_receipts_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "receipts"("id");--> statement-breakpoint
ALTER TABLE "receipt_items" ADD CONSTRAINT "receipt_items_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id");--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_store_id_stores_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id");