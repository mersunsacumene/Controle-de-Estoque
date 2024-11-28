import React, { useContext, useState } from 'react';
import { Box, Drawer, Card, CardContent, Typography, Button, TextField, MenuItem } from '@mui/material';
import { useBackground } from "./static/UseBackGround";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './static/Utils';
import { CarrinhotContext } from './CarrinhoContext';

function Carrinho() {
    useBackground('favicon2.png');

    const { produtosCarrinho, setProdutosCarrinho } = useContext(CarrinhotContext);
    const [drawerOpen, setDrawerOpen] = useState(true); // Drawer fixo à direita
    const [cupom, setCupom] = useState('');
    const [desconto, setDesconto] = useState(0); // Desconto em valor

    const handleCupomChange = (event) => {
        setCupom(event.target.value);
    };

    const aplicarDesconto = () => {
        if ((cupom === 'Matheus' || cupom === 'Emerson') && produtosCarrinho.length > 0) {
            setDesconto(50.0); // Exemplo de desconto fixo de R$ 50
        } else {
            setDesconto(0);
        }
    };

    // Função para alterar a quantidade do produto
    const alterarQuantidade = (id_prod, quantidade) => {
        setProdutosCarrinho((prev) => {
            return prev.map(item =>
                item.id_prod === id_prod ? { ...item, quantidade: parseInt(quantidade) } : item
            );
        });
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
                            Total: R${(
                            produtosCarrinho.reduce((acc, produto) => {
                                const preco = produto.preco_unit ?? produto.valor; // Pega preco_unit se existir, caso contrário, pega valor
                                return acc + parseFloat(preco) * produto.quantidade; // Calcula o preço total de acordo com a quantidade
                            }, 0) - desconto
                        ).toFixed(2)}
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
                            color="secondary"
                            onClick={aplicarDesconto}
                            sx={{ marginTop: '10px', background:"#1b4d93" }}
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
                            marginBottom: '16px',
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
                        <Card key={produto.id_prod} sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px', flex: 1 }}>
                                <Typography variant="h6">{produto.nome_prod}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Marca: {produto.marca_prod || 'Marca não disponível'}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    R${parseFloat(produto.preco_unit || produto.valor || 0).toFixed(2)}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
                                {/* Select para alterar a quantidade */}
                                <TextField
                                    select
                                    value={produto.quantidade}
                                    onChange={(e) => alterarQuantidade(produto.id_prod, e.target.value)}
                                    sx={{ width: '80px', marginBottom: '10px' }}
                                    size="small"
                                >
                                    {[1, 2, 3, 4, 5].map((quantidade) => (
                                        <MenuItem key={quantidade} value={quantidade}>
                                            {quantidade}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                {/* Botão de Remover */}
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => removeFromCart(produto.id_prod)} // Função de remover item
                                    sx={{ width: '100%', fontWeight: 'bold' }}
                                >
                                    Remover
                                </Button>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Carrinho;
