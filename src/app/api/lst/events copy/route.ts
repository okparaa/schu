import { classes } from "@/app/api/server/db/tables";
import { ClassesRepository } from "@/app/api/server/repository/classes.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { ClassesService } from "@/app/api/server/services/classes.service";
import { NextRequest, NextResponse } from "next/server";

const classesService = new ClassesService(new ClassesRepository(classes));
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await classesService.getClasses(params);
  return NextResponse.json(response);
}
