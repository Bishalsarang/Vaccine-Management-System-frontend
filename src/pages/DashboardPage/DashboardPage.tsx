import Sidebar from '../../components/Sidebar';

import { SIDEBAR_NAV_ITEMS } from '../../constants/base.constants';
import { getVaccines } from '../../services/vaccineService';
import ContentPage from '../ContentPage';

getVaccines();
export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar navigationItems={SIDEBAR_NAV_ITEMS} />
      <ContentPage />
    </div>
  );
}
