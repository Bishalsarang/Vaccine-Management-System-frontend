import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function BasePage() {
  return (
    <div className="h-screen items-center  justify-center bg-gray-100">
      <Outlet />
      <span>hss</span>
      <ToastContainer />
    </div>
  );
}
