/* eslint-disable @typescript-eslint/no-require-imports */

import { UsersSchema } from "../schemas/users.schema";
import { generateMock } from "@anatine/zod-mock";
import {
  classes,
  classUsers,
  // classUsers,
  events,
  grades,
  lessons,
  roles,
  subjects,
  userLessons,
  userRoles,
  users,
  userSubjects,
} from "./tables";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { RolesSchema } from "../schemas/roles.schema";
import { GradesSchema } from "../schemas/grades.schema";
import { ClassesSchema } from "../schemas/classes.schema";
import { eq } from "drizzle-orm";
import { SubjectsSchema } from "../schemas/subjects.schema";
import { LessonsSchema } from "../schemas/lessons.schema";
import dayjs from "dayjs";
import { EventsSchema } from "../schemas/events.schema";
import { UserLessonsSchema } from "../schemas/user_lessons.schema";
import { ClassUsersSchema } from "../schemas/class_users.schema";

export async function seed() {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);
  const teachersData: (typeof users.$inferInsert)[] = [];
  const studentsData: (typeof users.$inferInsert)[] = [];
  const parentsData: (typeof users.$inferInsert)[] = [];
  const rolesData: (typeof roles.$inferInsert)[] = [];
  const adminsData: (typeof users.$inferInsert)[] = [];
  const userRolesData: (typeof userRoles.$inferInsert)[] = [];
  const gradesData: (typeof grades.$inferInsert)[] = [];
  const classData: (typeof classes.$inferInsert)[] = [];
  const subjectsData: (typeof subjects.$inferInsert)[] = [];
  const lessonsData: (typeof lessons.$inferInsert)[] = [];
  const userSubjectsData: (typeof userSubjects.$inferInsert)[] = [];
  const userLessonsData: (typeof userLessons.$inferInsert)[] = [];
  const classUsersData: (typeof classUsers.$inferInsert)[] = [];
  const eventsData: (typeof events.$inferInsert)[] = [];

  const teacherRole = { ...generateMock(RolesSchema), role: "teacher" };
  const [teacherRol] = await db.insert(roles).values(teacherRole).returning();
  rolesData.push(teacherRol);

  const studentRole = { ...generateMock(RolesSchema), role: "student" };
  const [studentRol] = await db.insert(roles).values(studentRole).returning();
  rolesData.push(studentRol);

  const parentRole = { ...generateMock(RolesSchema), role: "parent" };
  const [parentRol] = await db.insert(roles).values(parentRole).returning();
  rolesData.push(parentRol);

  const adminRole = { ...generateMock(RolesSchema), role: "admin" };
  const [adminRol] = await db.insert(roles).values(adminRole).returning();
  rolesData.push(adminRol);

  const chars = "ABCD";

  for (let i = 0; i < 13; i++) {
    const subject = generateMock(SubjectsSchema);
    const [sub] = await db.insert(subjects).values(subject).returning();
    subjectsData.push(sub);
  }

  for (let i = 0; i < 30; i++) {
    const user = generateMock(UsersSchema);
    const [usr] = await db.insert(users).values(user).returning();
    userSubjectsData.push({
      subjectId: subjectsData[i % 13].id as string,
      userId: usr.id,
    });
    teachersData.push(usr);
    userRolesData.push({
      roleId: teacherRol.id,
      userId: usr.id,
      userType: "teacher",
    });
  }
  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  for (let i = 0; i < 5; i++) {
    const user = generateMock(UsersSchema);
    const [usr] = await db.insert(users).values(user).returning();
    adminsData.push(usr);
    userRolesData.push({
      roleId: adminRol.id,
      userId: usr.id,
      userType: "admin",
    });
  }
  for (let i = 0; i < 30; i++) {
    const user = generateMock(UsersSchema);
    const [usr] = await db.insert(users).values(user).returning();
    studentsData.push(usr);
    userRolesData.push({
      roleId: studentRol.id,
      userId: usr.id,
      userType: "student",
    });
  }
  for (let i = 0; i < 30; i++) {
    const user = generateMock(UsersSchema);
    const [usr] = await db.insert(users).values(user).returning();
    parentsData.push(usr);
    userRolesData.push({
      roleId: parentRol.id,
      userId: usr.id,
      userType: "parent",
    });
  }

  for (let k = 1; k <= 6; k++) {
    const grade = generateMock(GradesSchema);
    grade.level = String(k);
    const [grad] = await db.insert(grades).values(grade).returning();
    gradesData.push(grad);
    for (let m = 0; m < 2; m++) {
      const classs = generateMock(ClassesSchema);
      classs.name = grade.level + chars[m];
      classs.teacherId = teachersData[2 * k + m - 1].id as string;
      const [clazz] = await db.insert(classes).values(classs).returning();
      classData.push(clazz);
    }
  }

  for (let i = 0; i < 6; i++) {
    const event = generateMock(EventsSchema);
    event.classId = classData[i].id as string;
    event.startTime = dayjs().day(i).hour(3).toDate();
    event.endTime = dayjs().day(i).hour(4).toDate();
    const [evt] = await db.insert(events).values(event).returning();
    eventsData.push(evt);
  }

  for (let i = 0; i < parentsData.length; i++) {
    studentsData[i].parentId = parentsData[i].id;
    studentsData[i].gradeId = gradesData[i % 6].id;
    studentsData[i].classId = classData[i % 12].id;
    await db
      .update(users)
      .set({ ...studentsData[i] })
      .where(eq(users.id, studentsData[i].id as string));
  }

  for (let i = 0; i < 13; i++) {
    const lesson = generateMock(LessonsSchema);
    const userLesson = generateMock(UserLessonsSchema);
    const classUser = generateMock(ClassUsersSchema);
    lesson.day = days[i % 7];
    lesson.startTime = dayjs().day(i).hour(2).toDate();
    lesson.endTime = dayjs().day(i).hour(3).toDate();
    lesson.teacherId = teachersData[i].id as string;
    lesson.classId = classData[i % 12].id as string;
    lesson.subjectId = subjectsData[i].id as string;
    const [lessn] = await db.insert(lessons).values(lesson).returning();

    userLesson.userId = teachersData[i].id as string;
    userLesson.lessonId = lessn.id;
    userLessonsData.push(userLesson);

    classUser.userId = teachersData[i].id as string;
    classUser.classId = classData[i % 12].id as string;
    classUsersData.push(classUser);

    lessonsData.push(lessn);
  }

  await db.insert(classUsers).values(classUsersData);
  await db.insert(userLessons).values(userLessonsData);
  await db.insert(userSubjects).values(userSubjectsData);
  await db.insert(userRoles).values(userRolesData);
  console.log("Seed done");
}
