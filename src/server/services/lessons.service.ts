import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
import { LessonsRepository } from "../repository/lessons.repository";
import { RequestQueryType } from "../schemas/query.schema";

export class LessonsService {
  private repo;
  constructor(repository: LessonsRepository) {
    this.repo = repository;
  }

  async getLessons(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { tk, pg } = params;
      return await this.repo.getClasses(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
