import { useState } from "react";
import { QuizQuestionEditor } from "../components/QuizQuestionEditor";
import type { CreateQuizQuestion } from "../types/quiz";
import { createQuestions } from "../api/adminApi";

export function AdminDashboardPage() {
  const [questions, setQuestions] = useState<CreateQuizQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  function addQuestion() {
    setQuestions((qs) => [
      ...qs,
      {
        question: "",
        type: "MCQ",
        options: [""],
      },
    ]);
  }

  function updateQuestion(index: number, updatedQuestion: CreateQuizQuestion) {
    setQuestions((qs) => qs.map((q, i) => (i === index ? updatedQuestion : q)));
  }

  function removeQuestion(index: number) {
    setQuestions((qs) => qs.filter((_, i) => i !== index));
  }

  const isValid =
    questions.length > 0 &&
    questions.every((q) => {
      if (!q.question.trim()) return false;
      if (q.type === "MCQ") {
        return (
          q.options !== undefined &&
          q.options.length >= 2 &&
          q.options.every((opt) => opt.trim() !== "")
        );
      }
      return true;
    });

  async function handleSubmit() {
    if (!isValid) {
      setError("Please fix validation errors before submitting.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      // Simulate API call
      await createQuestions(questions);
      setSuccess(true);
      setQuestions([]);
    } catch (error) {
      setError("Submission failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (success) return <div>Questions submitted successfully!</div>;

  return (
    <div>
      <h1>ADMIN - Quiz Management</h1>
      {questions.map((q, index) => (
        <QuizQuestionEditor
          key={index}
          value={q}
          onChange={(val) => updateQuestion(index, val)}
          onRemove={() => removeQuestion(index)}
        />
      ))}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={addQuestion}>Add Question</button>

      <button disabled={!isValid || loading} onClick={handleSubmit}>
        Submit All Questions
      </button>
    </div>
  );
}
