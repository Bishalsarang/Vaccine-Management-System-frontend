import { Outlet } from 'react-router-dom';

export function BasePage() {
  return (
    <div className="flex min-h-screen items-center  justify-center bg-gray-100">
      <div className="container mx-auto items-center p-4">
        <Outlet />
      </div>
    </div>
  );
}
