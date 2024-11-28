import React, { useEffect, useState, useContext } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import { CarrinhotContext } from './CarrinhoContext';
import { useNavigate } from 'react-router-dom';

const agruparProdutos = (produtos, tamanhoGrupo) => {
    const grupos = [];
    for (let i = 0; i < produtos.length; i += tamanhoGrupo) {
        grupos.push(produtos.slice(i, i + tamanhoGrupo));
    }
    return grupos;
};

function Carroussel() {
    const [produtos, setProdutos] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const checkAuth = () => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    };

    useEffect(() => {
        checkAuth();
        carregarPromoções(); // Carregar promoções ao montar o componente
    }, []);

    const carregarPromoções = () => {
        axios.get('http://localhost:5000/promocao/promocoes')
            .then(response => {
                const promocoes = response.data.promocoesComItens.map(item => ({
                    evento: 'Promoção',
                    nome: item.produto.nome_prod,
                    valor: item.promocao.valor,
                    imagem: item.produto.url_img,
                }));
                setProdutos(promocoes);
            })
            .catch(error => {
                console.error('Erro ao carregar promoções', error);
            });
    };

    const lotes = agruparProdutos(produtos, 12);

    return (
        <Carousel
            animation="slide"
            duration={200}
            navButtonsAlwaysVisible
            autoPlay={true}
            interval={3000}
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
            navigate("/login");
            return;
        }
        addToCart(produto);
        console.log("Produto adicionado:", produto);
    };

    return (
        <Grid container spacing={2}>
            {produtos.map((produto, index) => (
                <Grid item xs={3} key={index}>
                    <Card>
                        <CardContent>
                            <Typography>{produto.evento}</Typography>
                            <img src={`http://localhost:5000${produto.imagem}`} alt={produto.nome} />
                            <Typography>{produto.nome}</Typography>
                            <Typography>{produto.valor}</Typography>
                            <Button onClick={() => handleAddToCart(produto)}>
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
