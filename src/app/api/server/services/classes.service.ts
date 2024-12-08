import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { ClassesRepository } from "../repository/classes.repository";
import { RequestQueryType } from "../schemas/query.schema";

export class ClassesService {
  private repo;
  constructor(repository: ClassesRepository) {
    this.repo = repository;
  }

  async getClasses(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { tk, pg } = params;
      return await this.repo.getClasses(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
