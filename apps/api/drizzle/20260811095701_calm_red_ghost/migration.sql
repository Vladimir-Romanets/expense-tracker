DROP INDEX "categories_name_unique_idx";--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_name_key" UNIQUE("name");