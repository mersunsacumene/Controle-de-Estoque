import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, TextField } from "@mui/material";
import { Card, CardContent, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "./static/Utils";
import { ThemeProvider } from '@mui/material/styles';
import { useBackground } from "./static/UseBackGround";
import axios from 'axios';

function Produtos() {
    useBackground('favicon2.png');

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    // Função para carregar todos os produtos
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/produto/produtos', {
                headers: { "Content-Type": "application/json" }
            });
            setProdutos(response.data);
        } catch (erro) {
            console.log("Erro ao carregar os produtos: ", erro);
        }
    };

    // Função para carregar produtos filtrados por tipo
    const fetchProductsByType = async (type) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/produto/produtosTipo',
                { type: type }, // Passando o tipo no corpo da requisição
                {
                    headers: { "Content-Type": "application/json" }
                });
            console.log("Produtos filtrados por tipo:", response.data);
            setProdutos(response.data); // Atualizando a lista de produtos
        } catch (erro) {
            console.log("Erro ao carregar produtos por tipo: ", erro);
        }
    };

    useEffect(() => {
        fetchProducts(); // Carregar todos os produtos ao carregar a página
    }, []);

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleSaveProduct = async () => {
    };

    // Função para tratar o click nos tipos de produtos
    const handleTypeClick = (type) => {
        fetchProductsByType(type); // Filtra os produtos pelo tipo clicado
    };

    return (
        <ThemeProvider theme={theme}>
            <IconButton onClick={() => toggleDrawer(true)} style={{ position: 'fixed', marginTop: '90px', left: '30px', cursor: 'pointer' }}>
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
                        height: 780,
                        display: 'flex',
                        marginTop: '65px',
                        backgroundColor: "solid",
                        color: "black",
                    },
                }}
            >
                <List style={{ margin: "50px 30px" }}>
                    <ListItem button onClick={() => handleTypeClick('Tênis')}>
                        <ListItemText primary="Tênis" />
                    </ListItem>
                    <ListItem button onClick={() => handleTypeClick('Chuteira')}>
                        <ListItemText primary="Chuteira" />
                    </ListItem>
                    <ListItem button onClick={() => handleTypeClick('Bota')}>
                        <ListItemText primary="Bota" />
                    </ListItem>
                    <ListItem button onClick={() => handleTypeClick('Chinelo')}>
                        <ListItemText primary="Chinelo" />
                    </ListItem>
                </List>
                <Box style={{ marginTop: '120%' }}>
                    <Button
                        style={{
                            background: '#FF8000',
                            color: 'black',
                            border: '2px solid black',
                            borderRadius: '99px',
                            width: 'max-content',
                            margin: "30px",
                        }}
                        onClick={handleOpenModal}
                    >
                        Adicionar Mercadoria
                    </Button>
                </Box>
            </Drawer>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Cadastrar Nova Mercadoria</DialogTitle>
                <DialogContent>
                    <TextField
                        label="CNPJ:"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Nome do Produto:"
                        name="nomeProduto"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Preço Unitário:"
                        name="precoUnitario"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Lote:"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="URL da Imagem"
                        name="urlImagem"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary" variant="contained">
                        Cancelar
                    </Button>
                    <Button onClick={() => { handleCloseModal(); }} color="secondary" variant="contained">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Grid2 container spacing={2} width="80%">
                    {produtos.map((produto, index) => (
                        <Grid2 item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{
                                marginTop: '120px',
                                border: '2px solid #02FF39',
                                borderRadius: '24px',
                            }}>
                                <CardContent style={{ textAlign: 'center' }}>
                                    <Typography component="img" src={`http://localhost:5000${produto.url_img}`} alt={produto.nome_prod} sx={{ width: '100%', objectFit: 'cover' }} />
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
