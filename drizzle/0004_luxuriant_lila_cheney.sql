ALTER TABLE "class_users" DROP CONSTRAINT "class_users_class_id_roles_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "class_users" ADD CONSTRAINT "class_users_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
