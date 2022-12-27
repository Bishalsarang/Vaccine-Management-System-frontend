import { toast, ToastOptions } from 'react-toastify';

const commonToastOptions: ToastOptions = {
  autoClose: 1000,
  hideProgressBar: true,
  position: toast.POSITION.BOTTOM_RIGHT,
};

export const showSuccessMessage = (
  message: string,
  options: ToastOptions = {},
) => {
  toast.success(message, { ...commonToastOptions, ...options });
};

export const showErrorMessage = (
  message: string,
  options: ToastOptions = {},
) => {
  toast.error(message, { ...commonToastOptions, ...options });
};
