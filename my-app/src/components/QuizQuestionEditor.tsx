import type { CreateQuizQuestion, QuestionType } from "../types/quiz";

export function QuizQuestionEditor({ value, onChange, onRemove }) {
  const update = (field: Partial<CreateQuizQuestion>) => {
    onChange({ ...value, ...field });
  };

  return (
    <div>
      <input
        placeholder="Question text"
        value={value.question}
        onChange={(e) => update({ question: e.target.value })}
      />
      <select
        value={value.type}
        onChange={(e) =>
          update({
            type: e.target.value as QuestionType,
            options: e.target.value === "MCQ" ? [""] : undefined,
          })
        }
      >
        <option value="MCQ">Multiple Choice</option>
        <option value="TRUE_FALSE">True/False</option>
        <option value="TEXT">Text</option>
      </select>
      {value.type === "MCQ" && (
        <div>
          {value.options?.map((opt, idx) => (
            <input
              key={idx}
              value={opt}
              onChange={(e) => {
                const newOptions = [...(value.options || [])];
                newOptions[idx] = e.target.value;
                update({ options: newOptions });
              }}
              placeholder={`Option ${idx + 1}`}
            />
          ))}
          <button
            onClick={() => update({ options: [...(value.options || []), ""] })}
          >
            Add Option
          </button>
        </div>
      )}
      <button onClick={onRemove}>Remove Question</button>
    </div>
  );
}
