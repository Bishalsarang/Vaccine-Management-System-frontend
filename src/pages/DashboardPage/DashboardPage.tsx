import { useCallback, useState } from 'react';

import Sidebar from '../../components/Sidebar';

import ContentPage from '../ContentPage';

import { SIDEBAR_NAV_ITEMS } from '../../constants/base.constants';

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleSidebarOpen = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

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
