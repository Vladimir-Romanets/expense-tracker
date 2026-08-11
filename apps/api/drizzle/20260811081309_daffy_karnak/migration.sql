ALTER TABLE "categories" ADD COLUMN "image_key" varchar(100);--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "is_system" boolean DEFAULT false NOT NULL;