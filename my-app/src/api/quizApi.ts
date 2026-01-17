import { CONFIG } from "../config";
import type { Question } from "../types/quiz";

export async function fetchQuizzes(): Promise<Question[]> {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/quizzes/list/`);
    if (!response.ok) {
      throw new Error("Failed to fetch quizzes");
    }
    const data: Question[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
}

export async function submitQuiz(data: {
  name: string;
  email: string;
  answers: { questionId: string; answer: string }[];
}): Promise<any> {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/quizzes/submit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to submit quiz");
    }
    return await response.json();
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return null;
  }
}
