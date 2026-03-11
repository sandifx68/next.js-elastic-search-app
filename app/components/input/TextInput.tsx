interface InputProps {
  id: string;
  label: string;
  type?: 'text' | 'password';
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
}: InputProps) {
  return (
    <div className="m-4 flex flex-col items-center">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-primary rounded p-1 outline-none"
      />
    </div>
  );
}
