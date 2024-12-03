import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
import { SubjectsRepository } from "../repository/subjects.repository";
import { RequestQueryType } from "../schemas/query.schema";

export class SubjectsService {
  private repo;
  constructor(repository: SubjectsRepository) {
    this.repo = repository;
  }

  async getSubjects(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { tk, pg } = params;
      return await this.repo.getSubjects(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
