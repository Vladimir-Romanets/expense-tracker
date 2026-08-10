ALTER TABLE "categories" ADD COLUMN "description" varchar(100);--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "image_key" SET DATA TYPE varchar(100) USING "image_key"::varchar(100);