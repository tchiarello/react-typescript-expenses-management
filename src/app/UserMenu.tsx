import React from 'react';
import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { signOutEndpoint } from './backend';
import { useAuthContext } from './authContext';

export default function UserMenu() {
  const { user, onSignOut } = useAuthContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    signOutEndpoint();
    onSignOut();
  }

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <h1>Despesas</h1>
      <IconButton
        aria-label='Usuário'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <Avatar src='/broken-image.jpg' />
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          padding='16px'
          textAlign='center'
          borderBottom='1px solid grey'
        >
          <Avatar src='/broken-image.jpg' />
          <Box marginTop='16px' marginBottom='8px'>
            {user.nome}
          </Box>
          <small>{user.email}</small>
        </Box>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
