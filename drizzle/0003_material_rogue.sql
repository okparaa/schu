CREATE TABLE IF NOT EXISTS "class_users" (
	"user_id" varchar NOT NULL,
	"class_id" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "classes" DROP CONSTRAINT "classes_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "class_users" ADD CONSTRAINT "class_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "class_users" ADD CONSTRAINT "class_users_class_id_roles_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "classes" DROP COLUMN IF EXISTS "user_id";