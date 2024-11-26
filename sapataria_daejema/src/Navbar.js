import React, { useContext, useState, useEffect } from 'react';
import {AppBar, Toolbar, Button, Box, ThemeProvider, Typography, Badge, Modal, TextField} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import threepng from './static/Logo (2).png';
import { theme } from "./static/Utils";
import { CarrinhotContext } from './CarrinhoContext'; // Importação do contexto
import { checkAuthentication } from './authUtils';

function Navbar() {
    const { produtosCarrinho } = useContext(CarrinhotContext); // Acessando produtosCarrinho
    const [isAuthenticated, setIsAuthenticated] = useState(() => checkAuthentication()); // Usando checkAuthentication
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'guest'); // Inicializando o papel do usuário
    const location = useLocation(); // Para obter a rota atual
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(checkAuthentication());
            setUserRole(localStorage.getItem('userRole') || 'guest'); // Atualiza o papel do usuário
            console.log("Papel do usuário:", localStorage.getItem('userRole')); // Adicione este log
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
        localStorage.removeItem('userRole'); // Remover o papel do usuário ao deslogar
        setIsAuthenticated(false);
        setUserRole('guest');
        window.dispatchEvent(new Event('storage'));
    };

    const renderAuthButtons = () => {
        if (userRole === 'funcionario' || userRole === 'adming') {
            // Apenas botão "Sair" para Funcionário/Admin
            return (
                <Button color="primary" onClick={logout}>
                    <Typography variant="h6">Sair</Typography>
                </Button>
            );
        }

        if (!isAuthenticated) {
            // Botões "Cadastro" e "Login" apenas para usuários não autenticados
            return (
                <Box>
                    <Button color="primary" component={Link} to="/cadastro">
                        <Typography variant="h8">Cadastro</Typography>
                    </Button>
                    <Button color="primary" onClick={()=>handleOpenLoginModal()}>
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
                            <Button    fullWidth
                                       variant="contained"
                                       color="primary"
                                       sx={{
                                           color:"#fff",
                                           bgcolor: '#1b4d93',
                                           mt: 2 }}
                                       onClick={() => {
                                           handleCloseLoginModal();
                                           navigate('/login');
                                       }}

                            >
                                Login Funcionario
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    color:"#fff",
                                    bgcolor: '#1b4d93',
                                    mt: 2 }}
                                onClick={() => {
                                    handleCloseLoginModal();
                                    navigate('/login');
                                }}
                            >
                                Login Usuario
                            </Button>
                        </Box>
                    </Modal>

                </Box>
            );
        }

        // Usuários comuns autenticados
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
        // Exibe links apenas para usuário comum
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

    const logoClickHandler = () => {
        // Desativa a navegação para funcionário e admin
        if (userRole === 'funcionario' || userRole === 'adming') {
            return;
        }
        window.location.href = '/';
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
                            onClick={logoClickHandler}
                        />
                    </Box>

                    {renderLinks()}
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
