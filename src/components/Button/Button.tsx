import { Button, CircularProgress, ButtonProps } from '@mui/material';

interface ButtonWrapperProps extends ButtonProps {
  label: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function ButtonWrapper({
  label,
  onClick,
  isLoading = false,
  isDisabled = false,
  ...rest
}: ButtonWrapperProps) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      disabled={isDisabled}
      {...rest}
    >
      {isLoading ? (
        <>
          <CircularProgress color="inherit" size={24} /> <span>{label}</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  );
}
