interface InputProps {
  id: string;
  label: string;
  type?: 'text' | 'password';
  value: string;
  centered?: boolean;
  onChange: (value: string) => void;
}

export default function TextInput({
  id,
  label,
  type = 'text',
  centered = true,
  value,
  onChange,
}: InputProps) {
  let divClass;
  if (centered) {
    divClass = divClass + ' m-4 flex flex-col items-center';
  } else {
    divClass = divClass + ' m-4 flex flex-col';
  }
  return (
    <div className={divClass}>
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
