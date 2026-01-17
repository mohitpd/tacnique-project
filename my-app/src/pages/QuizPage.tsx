import { useState } from "react";
import type { Question } from "../types/quiz";
import { submitQuiz } from "../api/quizApi";
import { QuizForm } from "../components/inputs/QuizForm";

export function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <QuizForm questions={questions} onSubmit={submitQuiz} />;
}
