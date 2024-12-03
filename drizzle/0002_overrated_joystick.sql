ALTER TABLE "classes" RENAME COLUMN "user_id" TO "teacher_id";--> statement-breakpoint
ALTER TABLE "classes" DROP CONSTRAINT "classes_user_id_teachers_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "classes" ADD CONSTRAINT "classes_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
