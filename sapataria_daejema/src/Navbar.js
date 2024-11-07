import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography, createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#c3062c',
    },
  },
});

function Navbar() {
  return (
    <ThemeProvider theme={theme}>
    <AppBar position="sticky" sx={{ backgroundColor: 'black', marginTop: -1}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 0 }}>
          <a href='/'><img
            src="./3.png" 
            alt="Logo"
            style={{ height: 80 }}
          /></a>
        </Box>

        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
          <Button color="secondary" component={Link} to="/"><h2>Home</h2></Button>
          <Button color="secondary" component={Link} to="/produtos"><h2>Produtos</h2></Button>
        </Box>

        <Box>
          <Button color="secondary" sx={{ marginRight: 2 }} component={Link} to="/cadastro"><h3>Cadastro</h3></Button>
          <Button color="secondary" component={Link} to="/login"><h3>Login</h3></Button>
        </Box>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
