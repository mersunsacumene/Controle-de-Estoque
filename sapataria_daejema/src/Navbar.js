import React, {useState} from 'react';
import {AppBar, Toolbar, Modal, Button, Box, ThemeProvider, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import threepng from './static/image3.png'
import {  theme } from "./static/Utils";



function Navbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" sx={{ backgroundColor: 'black', marginTop: -1, zIndex: 1201 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 0 }}>
              <a href='/'><img src={threepng} alt="Logo" style={{ height: 80 }} /></a>
            </Box>

            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
              <Button color="secondary" component={Link} to="/"><h2>Home</h2></Button>
              <Button color="secondary" component={Link} to="/produtos"><h2>Calçados</h2></Button>
            </Box>

            <Box>
              <Button color="secondary" sx={{ marginRight: 2 }} onClick={handleOpen}><h3>Cadastro</h3></Button>
              <Button color="secondary" component={Link} to="/login"><h3>Login</h3></Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
          <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
          >
            <Typography id="modal-title" variant="h6" component="h2" textAlign="center">
              Escolha o Tipo de Cadastro
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/cadastro"
                  onClick={handleClose}
              >
                Cadastro Normal
              </Button>
              <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/cadastroFuncionario"
                  onClick={handleClose}
              >
                Cadastro Funcionário
              </Button>
            </Box>
          </Box>
        </Modal>
      </ThemeProvider>
  );
}

export default Navbar;



