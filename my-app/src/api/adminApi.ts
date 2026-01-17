import { CONFIG } from "../config";
import { authFetch } from "./authApi";

export async function createQuestions(questions: any[]) {
  const res = await authFetch(`${CONFIG.API_BASE_URL}/admin/quizzes/`, {
    method: "POST",
    body: JSON.stringify(questions),
  });
  if (!res.ok) {
    throw new Error("Failed to create questions");
  }
}
