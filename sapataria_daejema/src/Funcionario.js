import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Modal
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "./static/Utils";
import { ThemeProvider } from '@mui/material/styles';
import { useBackground } from "./static/UseBackGround";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Produtos() {
    useBackground('favicon2.png');

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/produto/produtos', {
                headers: { "Content-Type": "application/json" }
            });
            console.log(response.data);
            setProdutos(response.data);
        } catch (erro) {
            console.log("Erro ao carregar os produtos: ", erro);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const handleOpenModal = (content) => {
        setModalContent(content);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <IconButton
                onClick={() => toggleDrawer(true)}
                style={{
                    position: 'fixed',
                    left: '30px',
                    cursor: 'pointer'
                }}
            >
                <MenuIcon /> <label>Menu</label>
            </IconButton>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 280,
                        height: "fill",
                        display: 'flex',
                        marginTop: '20px',
                        backgroundColor: "solid",
                        color: "black",
                    },
                }}
            >
                <List style={{ margin: "50px 30px", cursor:'pointer' }}>
                    <ListItem button onClick={() => navigate('/relatorios')}>
                        <ListItemText primary="Relatórios" />
                    </ListItem>

                    <ListItem button onClick={() => handleOpenModal('Cadastrar')}>
                        <ListItemText primary="Cadastros" />
                    </ListItem>

                    <ListItem button onClick={() => navigate('/adicionarMercadoria')}>
                        <ListItemText primary="Adicionar Mercadoria" />
                    </ListItem>
                </List>
            </Drawer>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        {modalContent}
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Este é o modal para {modalContent}.
                    </Typography>
                    <Button
                        onClick={handleCloseModal}
                        color="secondary"
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        Fechar
                    </Button>
                </Box>
            </Modal>

        </ThemeProvider>
    );
}

export default Produtos;
