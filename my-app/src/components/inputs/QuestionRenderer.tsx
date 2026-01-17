import type { Question } from "../../types/quiz";
import { MCQInput } from "./MCQInput";
import { TextInput } from "./TextInput";
import { TrueFalseInput } from "./TrueFalseInput";

export function QuestionRenderer(props: {
  question: Question;
  value?: string;
  onAnswer: (answer: string) => void;
}) {
  const { question, value, onAnswer } = props;

  return (
    <div>
      <h3>{question.question}</h3>
      {question.type === "MCQ" && question.options && (
        <MCQInput
          options={question.options}
          value={value}
          onChange={onAnswer}
        />
      )}

      {question.type === "TRUE_FALSE" && (
        <TrueFalseInput value={value} onChange={onAnswer} />
      )}

      {question.type === "TEST" && (
        <TextInput value={value} onChange={onAnswer} />
      )}
    </div>
  );
}
