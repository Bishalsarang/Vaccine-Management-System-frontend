import { Outlet } from 'react-router-dom';

export function BasePage() {
  return (
    <div className="min-h-screen items-center  justify-center bg-gray-100">
      <div className="container items-center">
        <Outlet />
      </div>
    </div>
  );
}
