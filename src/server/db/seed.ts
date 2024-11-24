/* eslint-disable @typescript-eslint/no-require-imports */

import { UsersSchema } from "../schemas/users.schema";
import { generateMock } from "@anatine/zod-mock";
import { classes, grades, roles, userRoles, users } from "./tables";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { RolesSchema } from "../schemas/roles.schema";
import { GradesSchema } from "../schemas/grades.schema";
import { ClassesSchema } from "../schemas/classes.schema";

export async function seed() {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);
  const teachersData: (typeof users.$inferInsert)[] = [];
  const studentsData: (typeof users.$inferInsert)[] = [];
  const parentsData: (typeof users.$inferInsert)[] = [];
  const rolesData: (typeof roles.$inferInsert)[] = [];
  const userRolesData: (typeof userRoles.$inferInsert)[] = [];
  const gradesData: (typeof grades.$inferInsert)[] = [];
  const classData: (typeof classes.$inferInsert)[] = [];
  const role = generateMock(RolesSchema);
  const grade = generateMock(GradesSchema);
  const classs = generateMock(ClassesSchema);
  rolesData.push(role);
  const chars = "abcd";

  for (let k = 1; k <= 6; k++) {
    grade.level = String(k);
    gradesData.push(grade);
    for (let m = 0; m < 4; m++) {
      classs.name = grade.level + chars[m];
    }
    classData.push(classs);
  }
  for (let i = 0; i < 15; i++) {
    const user = generateMock(UsersSchema);
    teachersData.push(user);
    userRolesData.push({ roleId: role.id, userId: user.id });
  }
  console.log("Seed start");
  await db.insert(grades).values(gradesData);
  await db.insert(users).values(teachersData);
  await db.insert(roles).values(rolesData);
  await db.insert(userRoles).values(userRolesData);
  console.log("Seed done");
}
