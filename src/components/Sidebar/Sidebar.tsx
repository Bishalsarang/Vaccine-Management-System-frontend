import { NavLink } from 'react-router-dom';

import { IconType } from 'react-icons/lib/cjs/iconBase';

interface SidebarProps {
  navigationItems: { label: string; path: string; icon: IconType }[];
}

export default function Sidebar({ navigationItems = [] }: SidebarProps) {
  return (
    <div className="w-61 h-full bg-slate-900 p-4">
      <div className="mb-4 flex items-center">
        <span className="text-center text-2xl font-bold text-blue-400 shadow-xl">
          Vaccine Management System
        </span>
      </div>

      <nav className="text-2xl font-semibold text-white">
        {navigationItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            className="flex items-center p-3 hover:bg-gray-800 active:bg-gray-100"
          >
            <>
              <div className="flex items-center gap-2">
                <item.icon />
                {item.label}
              </div>
            </>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
