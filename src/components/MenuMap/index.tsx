import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import * as React from 'react';

interface MenuMapProps {
  setOpenMenuMap?: React.Dispatch<React.SetStateAction<boolean>>;
  openMenuMap?: boolean;
}

const MenuMap: React.FC<MenuMapProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>Dashboard</Button>
      <Menu
        anchorEl={null} // Não usamos o botão como âncora
        open={open}
        onClose={handleClose}
        sx={{
          position: 'fixed',
          width: '70vw',
          height: '80vh',
          margin: '18vh auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <MenuItem sx={{ width: '100%' }}>
          <h1>sffsad</h1>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuMap;
