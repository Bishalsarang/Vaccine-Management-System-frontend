import { NavLink } from 'react-router-dom';
import {
  List,
  Drawer,
  Divider,
  Tooltip,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import { IconType } from 'react-icons/lib/cjs/iconBase';

interface SidebarProps {
  navigationItems: { label: string; path: string; icon: IconType }[];
  isOpen: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export default function Sidebar({
  isOpen,
  onOpen,
  onClose,
  navigationItems = [],
}: SidebarProps) {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
  const activeStyle = {
    textDecoration: 'underline',
    background: 'red',
  };

  return (
    <div className="bg-white shadow-md">
      {!isOpen && (
        <div>
          <div className="mb-4 flex items-center p-4">
            <span className="max-w-xs text-center text-2xl font-bold text-blue-400 ">
              VMS
            </span>

            <IconButton onClick={onOpen}>
              <MenuIcon />
            </IconButton>
          </div>
          <Divider />

          <div className="flex flex-col items-center">
            <List>
              {navigationItems.map((item) => (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => {
                    return isActive ? 'Mui-selected bg-red-400' : '';
                  }}
                  key={item.label}
                >
                  <Tooltip title={item.label} placement="right-start">
                    <ListItem className="">
                      <ListItemIcon className="p-2">
                        <item.icon fontSize={24} size={24} />
                      </ListItemIcon>
                    </ListItem>
                  </Tooltip>
                </NavLink>
              ))}
            </List>
          </div>
        </div>
      )}
      <Drawer anchor="left" open={isOpen} onClose={onClose}>
        <div>
          <div className="mb-4 flex items-center p-4">
            <span className="max-w-xs text-center text-2xl font-bold text-blue-400 ">
              Vaccine Management System
            </span>
          </div>
          <Divider />
          <List>
            {navigationItems.map((item) => (
              <NavLink to={item.path} key={item.label}>
                <ListItem className="">
                  <ListItemIcon>
                    <item.icon fontSize={24} size={24} />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </div>
      </Drawer>
      {isOpen && (
        <IconButton onClick={onClose}>
          <MenuIcon />
        </IconButton>
      )}
    </div>
  );
}
