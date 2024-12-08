import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { StudentsRepository } from "../repository/students.repository";
import { RequestQueryType } from "../schemas/query.schema";

export class StudentsService {
  private repo;
  constructor(repository: StudentsRepository) {
    this.repo = repository;
  }

  async getStudents(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { tk, pg } = params;
      return await this.repo.getStudents(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
  async getStudent(id: string) {
    // Basic validation for limit and offset
    try {
      return await this.repo.getStudent(id);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
