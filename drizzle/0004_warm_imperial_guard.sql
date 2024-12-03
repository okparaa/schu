ALTER TABLE "users" ADD COLUMN "description" varchar;--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN IF EXISTS "description";