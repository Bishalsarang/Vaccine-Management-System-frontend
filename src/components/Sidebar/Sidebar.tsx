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
import { APPLICATION_INFORMATION } from '../../constants/langConstants';

/**
 * Represents the properties of the Sidebar component.
 *
 * @interface SidebarProps
 */
export interface SidebarProps {
  /**
   * The navigation items to display in the sidebar.
   *
   * @type {{ label: string; path: string; icon: IconType }[]}
   */
  navigationItems: { label: string; path: string; icon: IconType }[];

  /**
   * Indicates whether the sidebar is open.
   *
   * @type {boolean}
   */
  isOpen: boolean;

  /**
   * A function that is called when the sidebar is closed.
   *
   * @type {(() => void)|undefined}
   */
  onClose?: () => void;

  /**
   * A function that is called when the sidebar is opened.
   *
   * @type {(() => void)|undefined}
   */
  onOpen?: () => void;
}

// TODO: Refactor this and add selected state.
export default function Sidebar({
  isOpen,
  onOpen,
  onClose,
  navigationItems = [],
}: SidebarProps) {
  return (
    <div className="bg-white shadow-md">
      {!isOpen && (
        <div>
          <div className="mb-4 flex items-center p-4">
            <span className="max-w-xs text-center text-2xl font-bold text-blue-400 ">
              {APPLICATION_INFORMATION.ABBREVIATED_TITLE}
            </span>

            <IconButton onClick={onOpen}>
              <MenuIcon />
            </IconButton>
          </div>
          <Divider />

          <div className="flex flex-col items-center">
            <List>
              {navigationItems.map((item) => (
                <NavLink to={item.path} key={item.label}>
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
              {APPLICATION_INFORMATION.TITLE}
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
