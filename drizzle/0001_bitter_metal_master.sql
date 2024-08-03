ALTER TABLE "user" RENAME TO "shop";--> statement-breakpoint
ALTER TABLE "shop" RENAME COLUMN "email" TO "certificate";--> statement-breakpoint
ALTER TABLE "shop" ALTER COLUMN "certificate" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "shop" ADD COLUMN "citizenship_image" text;--> statement-breakpoint
ALTER TABLE "shop" ADD COLUMN "business_image" text;