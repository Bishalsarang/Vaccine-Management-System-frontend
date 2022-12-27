import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Button from '../Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  message: string;
  heading: string;
  acceptButtontext: string;
  cancelButtonText: string;
  onClose?: () => void;
  onAccept?: () => void;
}

export default function ConfirmationDialog({
  onClose,
  onAccept,
  heading = '',
  message = '',
  isOpen = false,
  acceptButtontext = 'Accept',
  cancelButtonText = 'Cancel',
}: ConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {cancelButtonText && (
          <Button
            color="secondary"
            onClick={onClose}
            variant="outlined"
            label={cancelButtonText}
          />
        )}
        {acceptButtontext && (
          <Button color="error" label={acceptButtontext} onClick={onAccept} />
        )}
      </DialogActions>
    </Dialog>
  );
}
