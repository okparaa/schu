import { lessons } from "@/app/api/server/db/tables";
import { LessonsRepository } from "@/app/api/server/repository/lessons.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { LessonsService } from "@/app/api/server/services/lessons.service";
import { NextRequest, NextResponse } from "next/server";

const lessonsService = new LessonsService(new LessonsRepository(lessons));
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await lessonsService.getLessons(params);
  return NextResponse.json(response);
}
