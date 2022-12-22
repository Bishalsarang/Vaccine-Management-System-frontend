interface LabelProps {
  htmlFor: string;
  value: string;
}

export function Label({ htmlFor, value }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="cursor-pointer text-sm font-medium">
      {value}
    </label>
  );
}
