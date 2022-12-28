import { Button, CircularProgress, ButtonProps } from '@mui/material';

interface ButtonWrapperProps extends ButtonProps {
  label: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  component?: string;
  onClick?: () => void;
}

export function ButtonWrapper({
  label,
  onClick,
  isLoading = false,
  isDisabled = false,
  children,
  ...rest
}: ButtonWrapperProps) {
  return (
    <Button
      component="label"
      onClick={onClick}
      variant="contained"
      disabled={isDisabled}
      {...rest}
    >
      <>
        {isLoading ? (
          <>
            <CircularProgress color="inherit" size={24} /> <span>{label}</span>
          </>
        ) : (
          <span>{label}</span>
        )}

        {children}
      </>
    </Button>
  );
}
