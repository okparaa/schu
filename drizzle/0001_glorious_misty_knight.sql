CREATE TYPE "public"."days" AS ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"status" boolean DEFAULT true,
	"title" varchar,
	"description" varchar,
	"classId" varchar,
	"start_time" timestamp,
	"end_time" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "announcements" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"status" boolean DEFAULT true,
	"title" varchar NOT NULL,
	"description" varchar,
	"class_id" varchar,
	"date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_lessons" (
	"user_id" varchar NOT NULL,
	"lesson_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_subjects" (
	"user_id" varchar NOT NULL,
	"subject_id" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "results" RENAME COLUMN "name" TO "score";--> statement-breakpoint
ALTER TABLE "grades" RENAME COLUMN "name" TO "level";--> statement-breakpoint
ALTER TABLE "assignments" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "exams" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "exams" RENAME COLUMN "grade" TO "start_time";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "class_id" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "grade_id" varchar;--> statement-breakpoint
ALTER TABLE "results" ADD COLUMN "assignment_id" varchar;--> statement-breakpoint
ALTER TABLE "results" ADD COLUMN "user_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "day" "days";--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "start_time" date;--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "end_time" date;--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "subject_id" varchar;--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "class_id" varchar;--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "user_id" varchar;--> statement-breakpoint
ALTER TABLE "classes" ADD COLUMN "capacity" numeric;--> statement-breakpoint
ALTER TABLE "classes" ADD COLUMN "user_id" varchar;--> statement-breakpoint
ALTER TABLE "classes" ADD COLUMN "grade_id" varchar;--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "start_date" timestamp;--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "end_date" timestamp;--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "lesson_id" varchar;--> statement-breakpoint
ALTER TABLE "attendance" ADD COLUMN "date" timestamp;--> statement-breakpoint
ALTER TABLE "attendance" ADD COLUMN "lesson" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "exams" ADD COLUMN "end_time" timestamp;--> statement-breakpoint
ALTER TABLE "exams" ADD COLUMN "lesson_id" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_classId_classes_id_fk" FOREIGN KEY ("classId") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "announcements" ADD CONSTRAINT "announcements_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_lessons" ADD CONSTRAINT "user_lessons_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_lessons" ADD CONSTRAINT "user_lessons_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_subjects" ADD CONSTRAINT "user_subjects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_subjects" ADD CONSTRAINT "user_subjects_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_grade_id_grades_id_fk" FOREIGN KEY ("grade_id") REFERENCES "public"."grades"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "results" ADD CONSTRAINT "results_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "results" ADD CONSTRAINT "results_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "classes" ADD CONSTRAINT "classes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "classes" ADD CONSTRAINT "classes_grade_id_grades_id_fk" FOREIGN KEY ("grade_id") REFERENCES "public"."grades"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assignments" ADD CONSTRAINT "assignments_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance" ADD CONSTRAINT "attendance_lesson_lessons_id_fk" FOREIGN KEY ("lesson") REFERENCES "public"."lessons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exams" ADD CONSTRAINT "exams_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "grades" DROP COLUMN IF EXISTS "result_id";--> statement-breakpoint
ALTER TABLE "grades" DROP COLUMN IF EXISTS "exam_id";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phone_unique" UNIQUE("phone");