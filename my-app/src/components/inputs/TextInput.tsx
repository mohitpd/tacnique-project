export function TextInput(props: {
  value?: string;
  onChange: (value: string) => void;
}) {
  const { value, onChange } = props;
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} />;
}
