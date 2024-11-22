import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid2,
    Card,
    CardContent,
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
import { useNavigate } from 'react-router-dom'; // Para redirecionar páginas

function Produtos() {
    useBackground('favicon2.png');

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate(); // Usado para redirecionar

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
                    marginTop: '90px',
                    left: '30px',
                    cursor: 'pointer'
                }}
            >
                <MenuIcon /> <label>Menu</label>
            </IconButton>

            {/* Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 280,
                        height: 780,
                        display: 'flex',
                        marginTop: '65px',
                        backgroundColor: "solid",
                        color: "black",
                    },
                }}
            >
                <List style={{ margin: "50px 30px" }}>
                    {/* Redirecionar para a página Relatórios */}
                    <ListItem button onClick={() => navigate('/relatorios')}>
                        <ListItemText primary="Relatórios" />
                    </ListItem>

                    {/* Abrir modal para Cadastros */}
                    <ListItem button onClick={() => handleOpenModal('Cadastrar')}>
                        <ListItemText primary="Cadastros" />
                    </ListItem>

                    {/* Abrir modal para Adicionar Mercadoria */}
                    <ListItem button onClick={() => handleOpenModal('Adicionar Mercadoria')}>
                        <ListItemText primary="Adicionar Mercadoria" />
                    </ListItem>
                </List>
            </Drawer>

            {/* Modal */}
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

            {/* Conteúdo Principal */}
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Grid2 container spacing={2} width="80%">
                    {produtos.map((produto, index) => (
                        <Grid2 item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    marginTop: '120px',
                                    border: '2px solid #02FF39',
                                    borderRadius: '24px',
                                }}
                            >
                                <CardContent style={{ textAlign: 'center' }}>
                                    <Typography
                                        component="img"
                                        src={`http://localhost:5000${produto.url_img}`}
                                        alt={produto.nome_prod}
                                        sx={{ width: '100%', objectFit: 'cover' }}
                                    />
                                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                        {produto.nome_prod}
                                    </Typography>
                                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                        Valor Unitário: R${produto.preco_unit}
                                    </Typography>
                                    <Button
                                        style={{
                                            background: '#FF8000',
                                            color: 'black',
                                            border: '2px solid black',
                                            borderRadius: '99px',
                                        }}
                                    >
                                        Comprar
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </ThemeProvider>
    );
}

export default Produtos;
