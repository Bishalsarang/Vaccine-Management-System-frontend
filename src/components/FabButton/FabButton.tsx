import { Fab, Tooltip, SxProps } from '@mui/material';

interface FabButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  tooltipMessage?: string;
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
        aria-label="add"
        sx={{
          right: 32,
          bottom: 32,
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
