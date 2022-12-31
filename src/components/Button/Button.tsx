import { Button, CircularProgress, ButtonProps } from '@mui/material';

/**
 * Represents the properties of the ButtonWrapper component.
 *
 * @interface ButtonWrapperProps
 * @extends {ButtonProps}
 */
interface ButtonWrapperProps extends ButtonProps {
  /**
   * The label of the button.
   *
   * @type {string}
   */
  label: string;

  /**
   * Indicates whether the button is in a loading state.
   *
   * @type {(boolean | undefined)}
   */
  isLoading?: boolean;

  /**
   * Indicates whether the button is disabled.
   *
   * @type {(boolean | undefined)}
   */
  isDisabled?: boolean;

  /**
   * The component of the button.
   *
   * @type {(string | undefined)}
   */
  component?: string;

  /**
   * The onClick handler for the button.
   *
   * @type {(() => void | undefined)}
   */
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
