import { events } from "@/app/api/server/db/tables";
import { EventsRepository } from "@/app/api/server/repository/events.repository";
import { RequestQuerySchema } from "@/app/api/server/schemas/query.schema";
import { EventsService } from "@/app/api/server/services/events.service";
import { NextRequest, NextResponse } from "next/server";

const eventsService = new EventsService(new EventsRepository(events));
export async function GET(req: NextRequest) {
  const params = RequestQuerySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const response = await eventsService.getEvents(params);
  return NextResponse.json(response);
}
