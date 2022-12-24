interface TextInputProps {
  id: string;
  value?: string;
  type: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({
  id,
  value,
  type,
  placeholder,
  onChange,
}: TextInputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-200 bg-transparent p-2 outline-none focus:outline-gray-400"
    />
  );
}
