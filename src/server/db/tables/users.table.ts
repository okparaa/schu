import { InferSelectModel } from "drizzle-orm";
import {
  AnyPgColumn,
  boolean,
  date,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "../create-id";
import { classes } from "./classes.table";
import { grades } from "./grades.table";

export const genderEnum = pgEnum("gender", ["male", "female"]);

export const users = pgTable("users", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("users"))
    .primaryKey(),
  syn: boolean("syn").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(false),
  surname: varchar("surname", { length: 60 }).notNull(),
  email: varchar("email", { length: 60 }).notNull().unique(),
  username: varchar("username", { length: 60 }).notNull().unique(),
  password: varchar("password", { length: 60 }).notNull(),
  firstname: varchar("firstname", { length: 60 }).notNull(),
  lastname: varchar("lastname", { length: 60 }),
  phone: varchar("phone", { length: 30 }).unique().notNull(),
  dateOfBirth: date("date_of_birth").$type<Date>(),
  address: varchar("address"),
  bloodType: varchar("blood_type"),
  photo: varchar("photo"),
  gender: genderEnum(),
  parentId: varchar("parent_id").references((): AnyPgColumn => users.id),
  classId: varchar("class_id").references((): AnyPgColumn => classes.id),
  gradeId: varchar("grade_id").references((): AnyPgColumn => grades.id),
});

export type Users = InferSelectModel<typeof users>;
