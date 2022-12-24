interface LabelProps {
  htmlFor: string;
  value: string;
  type?: 'default' | 'error';
}

export function Label({ htmlFor, value, type = 'default' }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={
        'cursor-pointer text-sm font-medium ' +
        `${type === 'error' ? 'text-red-500' : 'text-gray-600'}`
      }
    >
      {value}
    </label>
  );
}
