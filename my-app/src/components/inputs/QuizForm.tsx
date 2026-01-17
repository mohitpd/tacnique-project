import { useState } from "react";
import type { Question } from "../../types/quiz";
import { QuestionRenderer } from "./QuestionRenderer";

interface QuizFormProps {
  questions: Question[];
  onSubmit: (data: {
    name: string;

    email: string;
    answers: { questionId: string; answer: string }[];
  }) => Promise<any>;
}

export function QuizForm(props: QuizFormProps) {
  const { questions, onSubmit } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await onSubmit({
        name,
        email,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      });
      setSuccess(true);
    } catch (err) {
      setError("SUBMISSION FAILED: " + (err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return <div>Thank you for submitting the quiz!</div>;
  }

  return (
    <>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {questions.map((q) => (
        <QuestionRenderer
          key={q.id}
          question={q}
          value={answers[q.id] || ""}
          onAnswer={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
        />
      ))}
    </>
  );
}
