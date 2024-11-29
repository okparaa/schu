ALTER TABLE "lessons" ALTER COLUMN "start_time" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "lessons" ALTER COLUMN "end_time" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "user_roles" ADD COLUMN "user_type" varchar;