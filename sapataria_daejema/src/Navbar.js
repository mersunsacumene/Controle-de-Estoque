import React, { useContext, useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, ThemeProvider, Typography, Badge, Modal } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import threepng from './static/Logo (2).png';
import { theme } from "./static/Utils";
import { CarrinhotContext } from './CarrinhoContext';
import { checkAuthentication } from './authUtils';

function Navbar() {
    const { produtosCarrinho } = useContext(CarrinhotContext);
    const [isAuthenticated, setIsAuthenticated] = useState(() => checkAuthentication());
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'guest');
    const location = useLocation();
    const navigate = useNavigate();
    const [openLoginModal, setOpenLoginModal] = useState(false);


    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(checkAuthentication());
            setUserRole(localStorage.getItem('userRole') || 'guest');
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [location]);

    const handleOpenLoginModal = () => {
        setOpenLoginModal(true);
    };

    const handleCloseLoginModal = () => {
        setOpenLoginModal(false);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserRole('guest');
        window.dispatchEvent(new Event('storage'));
        navigate('/');
    };

    const renderAuthButtons = () => {
        if (userRole === 'funcionario' || userRole === 'adming') {
            return (
                <Button color="primary" onClick={logout}>
                    <Typography variant="h6">Sair</Typography>
                </Button>
            );
        }

        if (!isAuthenticated) {
            return (
                <Box>
                    <Button color="primary" onClick={()=> navigate('/cadastro')}>
                    <Typography variant="h8">Cadastro</Typography>
                    </Button>
                    <Button color="primary" onClick={handleOpenLoginModal}>
                        <Typography variant="h8">Login</Typography>
                    </Button>
                    <Modal
                        open={openLoginModal}
                        onClose={handleCloseLoginModal}
                        aria-labelledby="login-modal-title"
                        aria-describedby="login-modal-description"
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: '#fff',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                            }}
                        >
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{
                                    color: "#fff",
                                    bgcolor: '#1b4d93',
                                    mt: 2
                                }}
                                onClick={() => {
                                    handleCloseLoginModal();
                                    navigate('/login')
                                }}
                            >
                                Login Funcionário
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    color: "#fff",
                                    bgcolor: '#1b4d93',
                                    mt: 2
                                }}
                                onClick={() => {
                                    handleCloseLoginModal();
                                    navigate('/login')
                                }}
                            >
                                Login Usuário
                            </Button>
                        </Box>
                    </Modal>
                </Box>
            );
        }

        return (
            <Box>
                <Badge badgeContent={produtosCarrinho.length} color="error" overlap="circular" max={99}>
                    <Button color="primary" component={Link} to="/carrinho">
                        <Typography variant="h6">Carrinho</Typography>
                    </Button>
                </Badge>
                <Button color="primary" onClick={logout}>
                    <Typography variant="h6">Sair</Typography>
                </Button>
            </Box>
        );
    };

    const renderLinks = () => {
        if (userRole === 'funcionario' || userRole === 'adming') {
            return null;
        }

        return (
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                <Button color="primary" component={Link} to="/"><h2>Home</h2></Button>
                <Button color="primary" component={Link} to="/produtos"><h2>Calçados</h2></Button>
            </Box>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" sx={{ backgroundColor: '#1b4d93', top: 0, width: '100%', zIndex: 1201 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 4 }}>
                    <Box sx={{ flexGrow: 0 }}>
                        <img
                            src={threepng}
                            alt="Logo"
                            style={{ height: 80, cursor: 'pointer' }}
                            onClick={() => navigate('/')}
                        />
                    </Box>

                    {renderLinks()}
                    {renderAuthButtons()}
                </Toolbar>
            </AppBar>

            {/* Adiciona margem superior ao conteúdo */}
            <Box sx={{ marginTop: '100px' }}>
                {/* Aqui vai o conteúdo da página */}
            </Box>
        </ThemeProvider>
    );
}

export default Navbar;
