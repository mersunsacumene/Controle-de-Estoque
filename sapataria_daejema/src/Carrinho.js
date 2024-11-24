import React, { useState, useContext } from 'react';
import { Box, Drawer, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { useBackground } from "./static/UseBackGround";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './static/Utils';
import { CarrinhotContext } from './CarrinhoContext';

function Carrinho() {
    useBackground('favicon2.png');

    // Consome o estado do carrinho do contexto global
    const { produtosCarrinho, removeFromCart } = useContext(CarrinhotContext);

    const [drawerOpen, setDrawerOpen] = useState(true); // Drawer fixo à direita
    const [cupom, setCupom] = useState('');
    const [desconto, setDesconto] = useState(0); // Desconto em valor

    const handleToggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleCupomChange = (event) => {
        setCupom(event.target.value);
    };

    // Função para aplicar o desconto
    const aplicarDesconto = () => {
        if ((cupom === 'Matheus' || cupom === 'Emerson') && produtosCarrinho.length > 0) {
            setDesconto(50.0); // Exemplo de desconto fixo de R$ 50
        } else {
            setDesconto(0);
        }
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
                            Desconto: R${desconto.toFixed(2)}
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Total: R${(produtosCarrinho.reduce((acc, produto) => acc + parseFloat(produto.preco_unit), 0) - desconto).toFixed(2)}
                        </Typography>

                        {/* Campo para inserir o cupom */}
                        <TextField
                            label="Cupom de Desconto"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={cupom}
                            onChange={handleCupomChange}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={aplicarDesconto}
                            sx={{ marginTop: '10px' }}
                        >
                            Aplicar Cupom
                        </Button>
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
                    <Typography variant="h4" color="secondary" sx={{ fontWeight: 'bold' }} gutterBottom>
                        Carrinho de Compras
                    </Typography>

                    {produtosCarrinho.map((produto) => (
                        <Card key={produto.id_prod} sx={{ marginBottom: '20px', display: 'flex' }}>
                            <Box
                                component="img"
                                src={`http://localhost:5000${produto.url_img}`} // Certifique-se do caminho correto
                                alt={produto.nome_prod}
                                sx={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6">{produto.nome_prod}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Marca: {produto.marca_prod || 'Marca não disponível'}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    R${parseFloat(produto.preco_unit).toFixed(2)}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => removeFromCart(produto.id_prod)}
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
