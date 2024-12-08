import { ExpectationFailedException } from "@/app/api/server/exceptions/expectationFailed.exception";
import { RequestQueryType } from "../schemas/query.schema";
import { AttendanceRepository } from "../repository/attendance.repository";

export class AttendanceService {
  private repo;
  constructor(repository: AttendanceRepository) {
    this.repo = repository;
  }

  async getAttendance(params: RequestQueryType) {
    // Basic validation for limit and offset
    try {
      const { tk, pg } = params;
      return await this.repo.getAttendance(tk, tk * (pg - 1), params);
    } catch (error) {
      throw new ExpectationFailedException((error as Error).message);
    }
  }
}
