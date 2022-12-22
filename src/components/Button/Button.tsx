interface ButtonProps {
  isLoading?: boolean;
  label: string;
  type?: 'submit' | 'button';
}

export function Button({
  label,
  type = 'button',
  isLoading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className="inline-flex w-full items-center justify-center gap-4 rounded-lg  bg-blue-500 px-8 py-4 font-semibold text-white"
    >
      {isLoading && (
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      )}

      {label}
    </button>
  );
}
