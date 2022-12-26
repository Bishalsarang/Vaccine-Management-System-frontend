interface ButtonProps {
  isLoading?: boolean;
  label: string;
  onClick?: () => void;
  buttonRole?: 'primary' | 'secondary';
  type?: 'submit' | 'button';
}

export function Button({
  label,
  onClick,
  type = 'button',
  isLoading = false,
  buttonRole = 'primary',
}: ButtonProps) {
  const commonClasses =
    'inline-flex w-full justify-center rounded-md font-medium shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300';
  let buttonClasses;
  if (buttonRole === 'primary') {
    buttonClasses = `${commonClasses} border border-transparent bg-pink-600 px-4 py-2 text-white active:bg-pink-800`;
  } else {
    buttonClasses = `${commonClasses} border border-gray-300 bg-white px-4 py-2 text-gray-700 active:text-gray-800`;
  }

  return (
    <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
      <button type={type} onClick={onClick} className={buttonClasses}>
        {isLoading && (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        )}

        {label}
      </button>
    </span>
  );
}
