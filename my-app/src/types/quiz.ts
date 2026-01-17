export type QuestionType = "MCQ" | "TRUE_FALSE" | "TEST";

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[]; // Optional, only for MCQ type
}
