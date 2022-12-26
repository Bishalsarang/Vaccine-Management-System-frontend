import Dialog from '../Dialog';
interface VaccineDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const VaccineDialog = ({ isOpen = false, onClose }: VaccineDialogProps) => {
  return (
    <Dialog isOpen={isOpen} heading="Add vacccine" onClose={onClose}>
      <form></form>
    </Dialog>
  );
};

export default VaccineDialog;
