import Modal from 'react-modal';
import Button from '../Button';

interface DialogProps {
  isOpen: boolean;
  heading: string;
  onClose?: () => void;
  onAccept?: () => void;
  acceptButtonText?: string;
  cancelButtonText?: string;
  children: React.ReactNode;
}

function Dialog({
  heading,
  onClose,
  onAccept,
  children,
  isOpen = false,
  cancelButtonText = 'Cancel',
  acceptButtonText = 'Accept',
}: DialogProps) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onAfterClose={onClose}
      shouldCloseOnOverlayClick
      style={{
        content: {
          top: '50%',
          left: '50%',
          padding: '0',
          right: 'auto',
          bottom: 'auto',
          minWidth: '50vw',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <div className="rounded-md shadow-lg">
        <div className="rounded-md bg-white px-4 py-5">
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {heading}
            </h3>
            <button
              className="text-gray-500 transition duration-150 hover:text-gray-700 focus:underline focus:outline-none"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          {children}
        </div>
        <div className="gap-3 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <Button label={acceptButtonText} onClick={onAccept} />
          <Button
            onClick={onClose}
            buttonRole="secondary"
            label={cancelButtonText}
          />
        </div>
      </div>
    </Modal>
  );
}

export default Dialog;
