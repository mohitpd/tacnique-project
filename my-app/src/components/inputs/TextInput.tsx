export function TextInput(props: {
  value?: string;
  onChange: (answer: string) => void;
}) {
  const { value, onChange } = props;
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} />;
}
