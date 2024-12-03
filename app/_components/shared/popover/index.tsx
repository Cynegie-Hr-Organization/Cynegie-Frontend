import React, { useState } from 'react';
import { Popover, List, ListItem, ListItemText } from '@mui/material';

const MoreOptionsPopover: React.FC<{
  triggerButton: React.ReactNode;
  options: { name: string; onClick: () => void }[];
}> = ({ triggerButton, options }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      {React.cloneElement(triggerButton as React.ReactElement, {
        onClick: handleButtonClick,
      })}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List sx={{ color: '#475367', fontWeight: 400, fontSize: '14px' }}>
          {options.map((item) => (
            <ListItem
              key={item.name}
              component='button'
              sx={{
                '&:hover': { color: '#0035C3' },
              }}
              onClick={() => {
                item.onClick();
                handleClose();
              }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default MoreOptionsPopover;
