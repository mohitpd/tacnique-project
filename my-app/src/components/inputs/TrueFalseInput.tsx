export function TrueFalseInput(props: {
  value?: string;
  onChange: (value: string) => void;
}) {
  const { value, onChange } = props;
  return (
    <div>
      <input
        type="radio"
        id="true"
        checked={value === "true"}
        onChange={() => onChange("true")}
      />
      <label htmlFor="true">True</label>
      <input
        type="radio"
        id="false"
        checked={value === "false"}
        onChange={() => onChange("false")}
      />
      <label htmlFor="false">False</label>
    </div>
  );
}
