import { UsersSchema } from "../schemas/users.schema";
import { generateMock } from "@anatine/zod-mock";
import {
  classes,
  events,
  exams,
  grades,
  lessons,
  parents,
  roles,
  students,
  subjects,
  teachers,
  users,
  usersRoles,
} from "./tables";
import { db } from ".";
import { RolesSchema } from "../schemas/roles.schema";
import { GradesSchema } from "../schemas/grades.schema";
import { ClassesSchema } from "../schemas/classes.schema";
import { sql } from "drizzle-orm";
import { SubjectsSchema } from "../schemas/subjects.schema";
import { LessonsSchema } from "../schemas/lessons.schema";
import dayjs from "dayjs";
import { EventsSchema } from "../schemas/events.schema";
import { TeachersSchema } from "../schemas/teachers.schema";
import { StudentsSchema } from "../schemas/students.schema";
import { ParentsSchema } from "../schemas/parents.schema";
import { faker } from "@faker-js/faker";
import { SUBJECTS } from "./constants";
import { ExamsSchema } from "../schemas/exams.schema";
export const clearDb = async (): Promise<void> => {
  const query = sql<string>`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `;

  const tables = await db.execute(query);

  for (const table of tables.rows) {
    console.log("truncate table: ", table.table_name);
    const query = sql.raw(`TRUNCATE TABLE ${table.table_name} CASCADE;`);
    await db.execute(query);
  }
};

export async function seed() {
  try {
    await clearDb();
  } catch (err) {
    console.log(err);
  }

  const usersData: (typeof users.$inferInsert)[] = [];
  const teachersData: (typeof teachers.$inferInsert)[] = [];
  const studentsData: (typeof students.$inferInsert)[] = [];
  const parentsData: (typeof parents.$inferInsert)[] = [];
  const rolesData: (typeof roles.$inferInsert)[] = [];
  const usersRolesData: (typeof usersRoles.$inferInsert)[] = [];
  const gradesData: (typeof grades.$inferInsert)[] = [];
  const classData: (typeof classes.$inferInsert)[] = [];
  const subjectsData: (typeof subjects.$inferInsert)[] = [];
  const lessonsData: (typeof lessons.$inferInsert)[] = [];
  const eventsData: (typeof events.$inferInsert)[] = [];
  const examsData: (typeof exams.$inferInsert)[] = [];
  // const announcementsData: (typeof announcements.$inferInsert)[] = [];

  const chars = "ABCD";
  const ROLES = ["student", "teacher", "parent", "admin", "agent", "prop"];

  console.log("seeding table: roles");
  for (let i = 0; i < ROLES.length; i++) {
    const role = generateMock(RolesSchema);
    role.role = ROLES[i];
    const [rol] = await db.insert(roles).values(role).returning();
    rolesData.push(rol);
  }

  console.log("seeding table: subjects");
  for (let i = 0; i < SUBJECTS.length; i++) {
    const subject = generateMock(SubjectsSchema);
    subject.name = SUBJECTS[i];
    const [sub] = await db.insert(subjects).values(subject).returning();
    subjectsData.push(sub);
  }

  console.log("seeding table: teachers/users");
  const teacherRoleId = rolesData.find((role) => role.role == "teacher")?.id;
  for (let i = 0; i < 30; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const surname = faker.person.middleName();
    const user = generateMock(UsersSchema, {
      stringMap: {
        firstname: () => firstname,
        lastname: () => lastname,
        surname: () => surname,
        address: () => faker.location.streetAddress(),
        description: () => faker.lorem.sentence(),
        email: () =>
          faker.internet
            .email({ firstName: firstname, lastName: lastname })
            .toLowerCase(),
        username: () =>
          faker.internet.displayName({
            firstName: firstname,
            lastName: lastname,
          }),
      },
    });
    const teacher = generateMock(TeachersSchema);
    const [usr] = await db.insert(users).values(user).returning();
    usersData.push(usr);
    teacher.userId = usr.id;
    const [tcher] = await db.insert(teachers).values(teacher).returning();
    teachersData.push(tcher);
    usersRolesData.push({
      roleId: teacherRoleId as string,
      userId: usr.id,
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

  console.log("seeding table: parents/users");
  const parentRoleId = rolesData.find((role) => role.role == "parent")?.id;
  for (let i = 0; i < 30; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const surname = faker.person.middleName();
    const user = generateMock(UsersSchema, {
      stringMap: {
        firstname: () => firstname,
        lastname: () => lastname,
        surname: () => surname,
        address: () => faker.location.streetAddress(),
        username: () =>
          faker.internet.displayName({
            firstName: firstname,
            lastName: lastname,
          }),
        description: () => faker.lorem.sentence(),
        email: () =>
          faker.internet
            .email({ firstName: firstname, lastName: lastname })
            .toLowerCase(),
      },
    });
    const parent = generateMock(ParentsSchema);
    const [usr] = await db.insert(users).values(user).returning();
    usersData.push(usr);
    parent.userId = usr.id;
    const [paren] = await db.insert(parents).values(parent).returning();
    parentsData.push(paren);
    usersRolesData.push({
      roleId: parentRoleId as string,
      userId: usr.id,
    });
  }

  let cnt = 0;
  console.log("seeding table: classes and grades");
  for (let k = 1; k <= 6; k++) {
    const grade = generateMock(GradesSchema);
    grade.level = String(k);
    const [grad] = await db.insert(grades).values(grade).returning();
    gradesData.push(grad);
    for (let m = 0; m < 3; m++) {
      const classs = generateMock(ClassesSchema);
      classs.name = grade.level + chars[m];
      classs.gradeId = grad.id;
      classs.teacherId = teachersData[cnt++].id as string;
      const [clazz] = await db.insert(classes).values(classs).returning();
      classData.push(clazz);
    }
  }

  console.log("seeding table: students update");
  const studentRoleId = rolesData.find((role) => role.role == "student")?.id;
  for (let i = 0; i < 30; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const surname = faker.person.middleName();
    const user = generateMock(UsersSchema, {
      stringMap: {
        firstname: () => firstname,
        lastname: () => lastname,
        address: () => faker.location.streetAddress(),
        surname: () => surname,
        username: () =>
          faker.internet.displayName({
            firstName: firstname,
            lastName: lastname,
          }),
        description: () => faker.lorem.sentence(),
        email: () =>
          faker.internet
            .email({ firstName: firstname, lastName: lastname })
            .toLowerCase(),
      },
    });
    const student = generateMock(StudentsSchema);
    const [usr] = await db.insert(users).values(user).returning();
    student.userId = usr.id;
    student.parentId = parentsData[i].id as string;
    student.classId = classData[i % 12].id as string;
    student.gradeId = gradesData[i % 6].id as string;
    usersData.push(usr);

    const [std] = await db.insert(students).values(student).returning();
    studentsData.push(std);
    usersRolesData.push({
      roleId: studentRoleId as string,
      userId: usr.id,
    });
  }
  console.log("seeding table: events");
  for (let i = 0; i < 6; i++) {
    const event = generateMock(EventsSchema);
    event.classId = classData[i].id as string;
    event.startTime = dayjs().day(i).hour(3).toDate();
    event.endTime = dayjs().day(i).hour(4).toDate();
    const [evt] = await db.insert(events).values(event).returning();
    eventsData.push(evt);
  }
  // console.log("seeding table: students update");
  //   for (let i = 0; i < parentsData.length; i++) {
  //     studentsData[i].parentId = parentsData[i].id;
  //     studentsData[i].gradeId = gradesData[i % 6].id;
  //     studentsData[i].classId = classData[i % 12].id;
  //     await db
  //       .update(users)
  //       .set({ ...studentsData[i] })
  //       .where(eq(users.id, studentsData[i].id as string));
  //   }

  console.log("seeding table: lessons");
  for (let i = 0; i < 50; i++) {
    const lesson = generateMock(LessonsSchema);
    lesson.day = days[i % 7];
    lesson.startTime = dayjs().day(i).hour(2).toDate();
    lesson.endTime = dayjs().day(i).hour(3).toDate();
    lesson.teacherId = teachersData[i % 30].id as string;
    lesson.classId = classData[i % 12].id as string;
    lesson.subjectId = subjectsData[i % SUBJECTS.length].id as string;
    const [lessn] = await db.insert(lessons).values(lesson).returning();
    lessonsData.push(lessn);
  }

  console.log("seeding table: exams");
  for (let i = 0; i < 40; i++) {
    const exam = generateMock(ExamsSchema);
    exam.lessonId = lessonsData[i].id as string;
    exam.startTime = dayjs().day(i).hour(3).toDate();
    exam.endTime = dayjs().day(i).hour(4).toDate();
    const [exm] = await db.insert(exams).values(exam).returning();
    examsData.push(exm);
  }
  await db.insert(usersRoles).values(usersRolesData);
}

seed().catch((err) => {
  console.log(err);
  process.exit(1);
});
