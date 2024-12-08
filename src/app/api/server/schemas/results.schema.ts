import * as z from "zod";

export const ResultsSchema = z.object({
  score: z.string(),
  examId: z.string(),
  assignmentId: z.string(),
  studentId: z.string(),
});
