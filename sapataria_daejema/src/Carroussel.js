import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import { CarrinhotContext } from './CarrinhoContext';
import { useNavigate } from "react-router-dom";

// Função para agrupar produtos em lotes
const agruparProdutos = (produtos, tamanhoGrupo) => {
    const grupos = [];
    for (let i = 0; i < produtos.length; i += tamanhoGrupo) {
        grupos.push(produtos.slice(i, i + tamanhoGrupo));
    }
    return grupos;
};

function Carroussel() {
    const [produtos, setProdutos] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar a autenticação
    const checkAuth = () => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    };

    useEffect(() => {
        checkAuth();
        // Fazendo a requisição para buscar as promoções
        axios.get('http://localhost:5000/promocao/promocoes')  // Ajuste para o endpoint da sua API
            .then(response => {
                // Atualiza o estado com os produtos obtidos da API
                const promocoes = response.data.promocoesComItens.map(item => ({
                    evento: 'Promoção',
                    nome: item.produto.nome_prod,
                    valor: item.promocao.valor,
                    imagem: item.produto.url_img, // Defina um valor padrão para imagem, caso não venha
                }));
                setProdutos(promocoes);
            })
            .catch(error => {
                console.error('Erro ao carregar promoções', error);
            });
    }, []);

    // Agrupar produtos em lotes de 12 (para preencher 3 linhas com 4 cards cada)
    const lotes = agruparProdutos(produtos, 12);

    return (
        <Carousel
            animation="slide"
            duration={200}
            navButtonsAlwaysVisible
            autoPlay={true}
            interval={3000}
            indicatorContainerProps={{
                style: {
                    marginTop: '0px',
                    justifyContent: 'center',
                },
            }}
            indicatorIconButtonProps={{
                style: {
                    color: '#c4c4c4',
                },
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    color: '#3f51b5',
                },
            }}
        >
            {lotes.map((lote, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    <ProdutoGrid produtos={lote} isAuthenticated={isAuthenticated} />
                </Box>
            ))}
        </Carousel>
    );
}

function ProdutoGrid({ produtos, isAuthenticated }) {
    const { addToCart } = useContext(CarrinhotContext);
    const navigate = useNavigate();

    const handleAddToCart = (produto) => {
        if (!isAuthenticated) {
            alert("Você precisa estar logado para adicionar produtos ao carrinho!");
            navigate("/login"); // Redireciona para a página de login se não autenticado
            return;
        }
        addToCart(produto);
        console.log("Produto adicionado:", produto);
    };

    return (
        <Grid
            container
            spacing={2} // Espaçamento entre os cards
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4, // Espaçamento entre os itens
                overflowX: 'auto', // Rolagem horizontal para telas pequenas
                padding: 2,
            }}
        >
            {produtos.map((produto, index) => (
                <Grid item xs={3} key={index}>  {/* xs={3} para que 4 cards apareçam por linha (12 / 3 = 4) */}
                    <Card
                        sx={{
                            border: '2px solid #1b4d93',
                            borderRadius: '16px',
                            backgroundColor: 'black',
                            color: 'white',
                            height: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 2,
                        }}
                    >
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                {produto.evento}
                            </Typography>
                            <Box
                                component="img"
                                src={`http://localhost:5000${produto.imagem}`}
                                alt={produto.nome}
                                style={{
                                    width: '100%',
                                    maxHeight: '120px',
                                    objectFit: 'cover',
                                }}
                            />
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                {produto.nome}
                            </Typography>
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                {produto.valor}
                            </Typography>
                            <Button onClick={() => handleAddToCart(produto)}
                                    style={{
                                        background: '#1b4d93',
                                        color: 'white',
                                        border: '2px solid black',
                                        borderRadius: '99px',
                                        marginTop: '10px',
                                    }}
                            >
                                Comprar
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Carroussel;
