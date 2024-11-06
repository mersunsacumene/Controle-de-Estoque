import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 0 }}>
          <img
            src="./3.png" 
            alt="Logo"
            style={{ height: 80 }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/produtos">Produtos</Button>
        </Box>

        <Box>
          <Button color="inherit" sx={{ marginRight: 2 }} component={Link} to="/cadastro">Cadastro</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
