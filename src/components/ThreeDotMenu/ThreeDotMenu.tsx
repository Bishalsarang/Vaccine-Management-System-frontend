import React, { useCallback, useState } from 'react';

import { Menu, MenuItem, IconButton } from '@mui/material';

import { BsThreeDotsVertical } from 'react-icons/bs';

interface MenuItemProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface ThreeDotMenuProps {
  menuItems: MenuItemProps[];
}

function ThreeDotMenu({ menuItems = [] }: ThreeDotMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <IconButton onClick={handleClick}>
        <BsThreeDotsVertical />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map(({ label, icon, onClick }) => (
          <MenuItem onClick={onClick} key={label}>
            <div className="flex items-center">
              {icon}

              <span className="ml-3 text-lg"> {label}</span>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ThreeDotMenu;
