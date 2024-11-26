import React, { useEffect, useState } from 'react';
import { Box, Grid } from "@mui/material";
import { Card, CardContent, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "./static/Utils";
import { ThemeProvider } from '@mui/material/styles';
import { useBackground } from "./static/UseBackGround";
import axios from 'axios';
import { useContext } from 'react';
import { CarrinhotContext } from './CarrinhoContext';
import { useNavigate } from "react-router-dom";
import { checkAuthentication } from "./Navbar"; // Importa a função de verificação de autenticação

function Produtos() {
    useBackground('favicon2.png');
    const { addToCart } = useContext(CarrinhotContext);
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar a autenticação

    // Função que vai verificar a autenticação no componente
    const checkAuth = () => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    };

    useEffect(() => {
        checkAuth(); // Verifica a autenticação quando o componente for montado

        fetchProducts(); // Carrega os produtos
    }, []);

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

    const fetchProductsByType = async (type) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/produto/produtosTipo',
                { type: type },
                {
                    headers: { "Content-Type": "application/json" }
                });
            console.log("Produtos filtrados por tipo:", response.data);
            setProdutos(response.data);
        } catch (erro) {
            console.log("Erro ao carregar produtos por tipo: ", erro);
        }
    };

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const handleAddToCart = (produto) => {
        if (!isAuthenticated) {
            alert("Você precisa estar logado para adicionar produtos ao carrinho!");
            navigate("/login"); // Redireciona para a página de login se não autenticado
            return;
        }
        addToCart(produto);
        console.log("Produto adicionado:", produto);
    };

    const handleTypeClick = (type) => {
        fetchProductsByType(type);
    };

    return (
        <ThemeProvider theme={theme}>
            <IconButton onClick={() => toggleDrawer(true)} style={{ position: 'fixed', left: '30px', cursor: 'pointer' }}>
                <MenuIcon /> <label>Menu</label>
            </IconButton>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 280,
                        height: "fill",
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: '20px',
                        justifyContent: 'space-between',
                        backgroundColor: "solid",
                        color: "black",
                    },
                }}
            >
                <List style={{ margin: "50px 30px", cursor: "pointer" }}>
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
            </Drawer>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Grid container spacing={2} width="80%">
                    {produtos.map((produto, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{
                                marginTop: '120px',
                                border: '2px solid #1b4d93',
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
                                            background: '#1b4d93',
                                            color: '#fff',
                                            border: '2px solid black',
                                            borderRadius: '99px',
                                        }}
                                        onClick={() => handleAddToCart(produto)} >
                                        Adicionar ao Carrinho
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </ThemeProvider>
    );
}

export default Produtos;
