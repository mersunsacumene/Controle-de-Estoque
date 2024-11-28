import React, { useState, useContext } from 'react';
import { Box, Drawer, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { useBackground } from "./static/UseBackGround";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './static/Utils';
import { CarrinhotContext } from './CarrinhoContext';
import { useNavigate } from 'react-router-dom';

function Carrinho() {
    useBackground('favicon2.png');
    const navigate = useNavigate(); // Adiciona o hook de navegação

    const { produtosCarrinho, removeFromCart, updateProductQuantity, clearCart } = useContext(CarrinhotContext);
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [cupom, setCupom] = useState('');
    const [desconto, setDesconto] = useState(0);
    const [quantidadeTemp, setQuantidadeTemp] = useState({}); // Estado para quantidade temporária

    const handleCupomChange = (event) => {
        setCupom(event.target.value);
    };

    const aplicarDesconto = () => {
        if ((cupom === 'Matheus' || cupom === 'Emerson') && produtosCarrinho.length > 0) {
            setDesconto(50.0);
        } else {
            setDesconto(0);
        }
    };

    const handleQuantityChange = (event, produtoId, estoqueDisponivel) => {
        let newQuantity = parseInt(event.target.value, 10);

        // Verifica se a quantidade é um número válido e se não é menor que 1
        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1; // Garante que a quantidade mínima seja 1
        }

        // Verifica se a quantidade não ultrapassa o estoque disponível
        if (newQuantity <= estoqueDisponivel) {
            // Atualiza a quantidade temporária localmente
            setQuantidadeTemp({
                ...quantidadeTemp,
                [produtoId]: newQuantity,
            });
        } else {
            alert('Quantidade não pode ser maior que o estoque disponível.');
        }
    };

    const handleUpdateQuantity = (produtoId) => {
        // Atualiza a quantidade do produto no contexto com a quantidade temporária
        if (quantidadeTemp[produtoId] !== undefined) {
            updateProductQuantity(produtoId, quantidadeTemp[produtoId]);
        }
    };

    const finalizarCompra = async () => {
        const valorTotal = produtosCarrinho.reduce((acc, produto) => {
            const preco = produto.produto.preco_unit ?? produto.produto.valor;
            return acc + parseFloat(preco) * produto.quantidade;
        }, 0) - desconto;

        try {
            for (const produto of produtosCarrinho) {
                // Verifica se existe uma quantidade temporária e usa ela, senão usa a quantidade original
                const quantidade = quantidadeTemp[produto.produto.id_prod] !== undefined
                    ? quantidadeTemp[produto.produto.id_prod]
                    : produto.quantidade;

                // Enviando o pedido de criação de pedido
                const pedidoResponse = await fetch('http://localhost:5000/pedido/realizarPedido', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_user: localStorage.getItem('authToken'),
                        valor_tot: valorTotal,
                        id_estoque: produto.id_estoque, // Enviando um único ID de estoque
                        quantidade: quantidade, // Enviando a quantidade como um único número
                    }),
                });

                const pedidoData = await pedidoResponse.json();
                if (!pedidoResponse.ok) {
                    throw new Error(pedidoData.error || 'Erro ao criar o pedido.');
                }

                // Atualizando a movimentação do estoque para cada produto
                const movimentacaoResponse = await fetch('http://localhost:5000/movimentacao/movimentarCompra', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_estoque: produto.id_estoque,
                        quantidade: quantidade, // Enviando a quantidade como um único número
                    }),
                });

                if (!movimentacaoResponse.ok) {
                    throw new Error('Erro ao registrar a movimentação do estoque.');
                }
            }

            alert('Compra finalizada com sucesso!');
            clearCart(); // Limpa o carrinho após a compra
            navigate('/'); // Redireciona para a página inicial
        } catch (error) {
            console.error('Erro ao finalizar a compra:', error);
            alert('Erro ao finalizar a compra. Por favor, tente novamente.');
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
                            Total: R${(
                            produtosCarrinho.reduce((acc, produto) => {
                                const preco = produto.valor ?? produto.produto.preco_unit ;
                                return acc + parseFloat(preco) * produto.quantidade;
                            }, 0) - desconto
                        ).toFixed(2)}
                        </Typography>

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
                            onClick={finalizarCompra}
                        >
                            Finalizar Compra
                        </Button>
                    </Box>
                </Drawer>

                <Box sx={{ flex: 1, marginTop: '80px', marginRight: '320px' }}>
                    <Typography variant="h4" color="secondary" sx={{ fontWeight: 'bold' }} gutterBottom>
                        Carrinho de Compras
                    </Typography>

                    {produtosCarrinho.map((produto) => {
                        return (
                            <Card key={produto.produto.id_prod} sx={{ marginBottom: '20px', display: 'flex' }}>
                                <Box
                                    component="img"
                                    src={`http://localhost:5000${ produto.imagem ||produto.produto.url_img}`}
                                    alt={produto.nome_prod}
                                    sx={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6">{ produto.nome_prod || produto.produto.nome_prod }</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Marca: {produto.produto.marca_prod || 'Marca não disponível'}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        R${parseFloat(produto.produto.preco_unit || produto.produto.valor || 0).toFixed(2)}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <TextField
                                            type="number"
                                            label="Quantidade"
                                            value={quantidadeTemp[produto.produto.id_prod] !== undefined ? quantidadeTemp[produto.produto.id_prod] : produto.quantidade}
                                            onChange={(event) => handleQuantityChange(event, produto.produto.id_prod, produto.quantidade)}
                                            sx={{ width: '70px', marginRight: '10px' }}
                                        />
                                    </Box>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => removeFromCart(produto.produto.id_prod)}
                                        sx={{ marginTop: '10px' }}
                                    >
                                        Remover
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Carrinho;
