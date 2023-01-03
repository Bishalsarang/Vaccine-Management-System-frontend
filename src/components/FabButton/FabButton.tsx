import { Fab, Tooltip, SxProps } from '@mui/material';

/**
 * Represents the properties of the FabButton component.
 *
 * @interface FabButtonProps
 */
interface FabButtonProps {
  /**
   * The children of the FabButton component.
   *
   * @type {React.ReactNode}
   */
  children: React.ReactNode;

  /**
   * The onClick handler for the FabButton component.
   *
   * @type {(() => void | undefined)}
   */
  onClick?: () => void;

  /**
   * The message for the tooltip of the FabButton component.
   *
   * @type {(string | undefined)}
   */
  tooltipMessage?: string;

  /**
   * The styles for the FabButton component.
   *
   * @type {(SxProps<object> | undefined)}
   */
  styles?: SxProps<object>;
}

function FabButton({
  onClick,
  children,
  styles,
  tooltipMessage = '',
}: FabButtonProps) {
  return (
    <Tooltip title={tooltipMessage}>
      <Fab
        color="secondary"
        aria-label="fab-button"
        sx={{
          right: 60,
          bottom: 80,
          position: 'absolute',
          ...styles,
        }}
        onClick={onClick}
      >
        {children}
      </Fab>
    </Tooltip>
  );
}

export default FabButton;
