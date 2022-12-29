import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

import { SIDEBAR_NAV_ITEMS } from '../../constants/base.constants';

import ContentPage from '../ContentPage';

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        onOpen={handleSidebarOpen}
        onClose={handleSidebarClose}
        navigationItems={SIDEBAR_NAV_ITEMS}
      />
      <div className="w-full flex-1 overflow-auto">
        <ContentPage />
      </div>
    </div>
  );
}
