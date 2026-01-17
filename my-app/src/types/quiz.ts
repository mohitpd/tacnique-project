export type QuestionType = "MCQ" | "TRUE_FALSE" | "TEXT";

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[]; // Optional, only for MCQ type
}

export interface QuizSubmission {
  name: string;
  email: string;
  answers: { questionId: string; answer: string | boolean }[];
}

export interface CreateQuizQuestion {
  question: string;
  type: QuestionType;
  options?: string[]; // Only for MCQ type
}
