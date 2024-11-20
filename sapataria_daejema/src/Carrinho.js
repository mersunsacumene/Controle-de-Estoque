import React, { useState } from 'react';
import { Box, Drawer, Card, CardContent, Typography, Button, Grid, TextField } from '@mui/material';
import {useBackground} from "./static/UseBackGround";
import one from "./static/Sapato.png";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './static/Utils';


function Carrinho() {
    useBackground('favicon2.png');
    const [drawerOpen, setDrawerOpen] = useState(true);  // Drawer fixo à direita
    const [produtosCarrinho, setProdutosCarrinho] = useState([
        {
            id: 1,
            nome_prod: 'Tenis Futsal',
            preco_unit: 99.99,
            url_img: one,
            descricao: 'Tenis confortável para futsal'
        },
        {
            id: 2,
            nome_prod: 'Chuteira Campo',
            preco_unit: 150.99,
            url_img: one,
            descricao: 'Chuteira para campo, modelo profissional'
        }
    ]);
    const [endereco, setEndereco] = useState('');
    const [frete, setFrete] = useState(20.0);

    const handleToggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleRemoveProduct = (id) => {
        setProdutosCarrinho(produtosCarrinho.filter(produto => produto.id !== id));
    };

    const handleEnderecoChange = (event) => {
        setEndereco(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Drawer
                anchor="right"
                open={drawerOpen}
                variant="persistent"
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 300,
                        marginTop: '65px',
                        height: '95%',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                }}
            >
                <Box sx={{ padding: '20px', flex: 1 }}>
                    <Typography variant="h6" gutterBottom>Resumo do Carrinho</Typography>
                    <Typography variant="body1" gutterBottom>
                        Itens: {produtosCarrinho.length}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        Frete: R${frete.toFixed(2)}
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Total: R${(produtosCarrinho.reduce((acc, produto) => acc + produto.preco_unit, 0) + frete).toFixed(2)}
                    </Typography>

                    <TextField
                        label="Endereço"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={endereco}
                        onChange={handleEnderecoChange}
                    />
                </Box>

                <Box
                    sx={{
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 'auto',
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: 'max-content', fontWeight: 'bold' }}
                    >
                        Finalizar Compra
                    </Button>
                </Box>
            </Drawer>

            <Box sx={{ flex: 1, marginTop: '80px', marginRight: '320px' }}>
                <Typography variant="h4" color= "secondary" sx={{ fontWeight: 'bold' }} gutterBottom>
                    Carrinho de Compras
                </Typography>

                {produtosCarrinho.map((produto) => (
                    <Card key={produto.id} sx={{ marginBottom: '20px', display: 'flex' }}>
                        <Box
                            component="img"
                            src={produto.url_img}
                            alt={produto.nome_prod}
                            sx={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">{produto.nome_prod}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {produto.descricao}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                R${produto.preco_unit}
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleRemoveProduct(produto.id)}
                                sx={{ marginTop: '10px' }}
                            >
                                Remover
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
        </ThemeProvider>
    );
}

export default Carrinho;
