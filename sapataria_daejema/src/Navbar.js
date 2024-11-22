import React from 'react';
import {AppBar, Toolbar, Button, Box, ThemeProvider} from '@mui/material';
import { Link } from 'react-router-dom';
import threepng from './static/image3.png'
import {  theme } from "./static/Utils";


function Navbar() {
  return (
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" sx={{ backgroundColor: '#1b4d93', marginTop: -1, zIndex: 1201 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 0 }}>
              <a href='/'><img src={threepng} alt="Logo" style={{ height: 80 }} /></a>
            </Box>

            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
              <Button color="primary" component={Link} to="/"><h2>Home</h2></Button>
              <Button color="primary" component={Link} to="/produtos"><h2>Calçados</h2></Button>
            </Box>
              <Box>
                  <Button color="primary" component={Link} to="/cadastro"><h3>Cadastro</h3></Button>
                  <Button color="primary" component={Link} to="/login"><h3>Login</h3></Button>
              </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
  );
}

export default Navbar;



