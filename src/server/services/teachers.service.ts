import { ExpectationFailedException } from "@/server/exceptions/expectationFailed.exception";
import { TeachersRepository } from "../repository/teachers.repository";
import { RequestQueryType } from "../schemas/query.schema";

export class TeachersService {
  private repo;
  constructor(repository: TeachersRepository) {
    this.repo = repository;
  }

  async getTeachers(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { pg, tk } = params;
      return await this.repo.getTeachers(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
  async getTeacher(id: string) {
    // Basic validation for limit and offset
    try {
      return await this.repo.getTeacher(id);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
