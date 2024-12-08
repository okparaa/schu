import { attendance } from "@/app/api/server/db/tables";
import { AttendanceRepository } from "@/app/api/server/repository/attendance.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { AttendanceService } from "@/app/api/server/services/attendance.service";
import { NextRequest, NextResponse } from "next/server";

const attendanceService = new AttendanceService(
  new AttendanceRepository(attendance)
);
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await attendanceService.getAttendance(params);
  return NextResponse.json(response);
}
