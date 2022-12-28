import {
  Dialog,
  DialogTitle,
  DialogProps,
  DialogActions,
  DialogContent,
} from '@mui/material';

import Button from '../Button';

interface DialogWrapperProps extends DialogProps {
  open: boolean;
  heading: string;
  onClose?: () => void;
  onAccept?: () => void;
  acceptButtonText?: string;
  cancelButtonText?: string;
  children: React.ReactNode;
}

export function DialogWrapper({
  heading,
  onClose,
  onAccept,
  children,
  open = false,
  cancelButtonText = 'Cancel',
  acceptButtonText = 'Accept',
  ...rest
}: DialogWrapperProps) {
  return (
    <Dialog fullWidth open={open} onClose={onClose} {...rest}>
      <DialogTitle>{heading}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          onClick={onClose}
          label={cancelButtonText}
        ></Button>
        <Button
          color="primary"
          onClick={onAccept}
          label={acceptButtonText}
        ></Button>
      </DialogActions>
    </Dialog>
  );
}
