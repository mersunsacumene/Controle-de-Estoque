import React, {useState, useEffect} from 'react';
import {AppBar, Toolbar, Modal, Button, Box, ThemeProvider, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import threepng from './static/Logo (2).png'
import {  theme } from "./static/Utils";

function Navbar() {
    const [open, setOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(()=> {
        return !!localStorage.getItem('authToken');
    });

    const checkAuthentication = () => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            checkAuthentication();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        window.dispatchEvent(new Event('storage'));
    };

    const renderAuthButtons = () => {
        if (!isAuthenticated) {
            return (
                <Box>
                    <Button color="primary" component={Link} to="/cadastro">
                        <Typography variant="h8">Cadastro</Typography>
                    </Button>
                    <Button color="primary" component={Link} to="/login">
                        <Typography variant="h8">Login</Typography>
                    </Button>
                </Box>
            );
        }
        return (
            <Box>
                <Button color="primary" component={Link} to="/carrinho">
                    <Typography variant="h6">Carrinho</Typography>
                </Button>
                <Button color="primary" onClick={logout}>
                    <Typography variant="h6">Sair</Typography>
                </Button>
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" sx={{ backgroundColor: '#1b4d93', top: 0, width: '100%', zIndex: 1201 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 4 }}>
                    <Box sx={{ flexGrow: 0 }}>
                        <a href='/'><img src={threepng} alt="Logo" style={{ height: 80 }} /></a>
                    </Box>

                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                        <Button color="primary" component={Link} to="/"><h2>Home</h2></Button>
                        <Button color="primary" component={Link} to="/produtos"><h2>Calçados</h2></Button>
                    </Box>
                    {renderAuthButtons()}
                </Toolbar>
            </AppBar>

            <Box sx={{ marginTop: '80px' }}>
                {/* Conteúdo do body aqui */}
            </Box>
        </ThemeProvider>
    );
}

export default Navbar;
