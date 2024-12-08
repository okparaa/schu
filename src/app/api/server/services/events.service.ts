import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { EventsRepository } from "../repository/events.repository";

export class EventsService {
  private repo;
  constructor(repository: EventsRepository) {
    this.repo = repository;
  }

  async getEvents(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { tk, pg } = params;
      return await this.repo.getEvents(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
