import React from 'react';
import { AppBar, Toolbar, Button, Box, createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import threepng from './static/3.png'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#02FF39',
    },
  },
});

function Navbar() {
  return (
    <ThemeProvider theme={theme}>
    <AppBar position="fixed" sx={{ backgroundColor: 'black', marginTop: -1, zIndex: 1201}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 0 }}>
          <a href='/'><img
            src={threepng}
            alt="Logo"
            style={{ height: 80 }}
          /></a>
        </Box>

        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
          <Button color="secondary" component={Link} to="/"><h2>Home</h2></Button>
          <Button color="secondary" component={Link} to="/produtos"><h2>Calçados</h2></Button>
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
