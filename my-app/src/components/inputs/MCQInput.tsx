export function MCQInput(props: {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}) {
  const { options, value, onChange } = props;
  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`mcq-option-${index}`}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <label htmlFor={`mcq-option-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );
}
