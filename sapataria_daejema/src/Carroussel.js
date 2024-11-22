import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Card, CardContent, Typography, Button, Grid2 } from '@mui/material';
import axios from 'axios';

const agruparProdutos = (produtos, tamanhoGrupo) => {
    const grupos = [];
    for (let i = 0; i < produtos.length; i += tamanhoGrupo) {
        grupos.push(produtos.slice(i, i + tamanhoGrupo));
    }
    return grupos;
};

function Carroussel() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
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

    const lotes = agruparProdutos(produtos, 4);

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
                <CarouselProduto key={index} produtos={lote} />
            ))}
        </Carousel>
    );
}

function ProdutoGrid({ produtos }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Grid2 container spacing={2}>
                {produtos.map((produto, index) => (
                    <Grid2 item xs={12} sm={6} md={3} key={index} >
                        <Card
                            sx={{
                                marginTop: '120px',
                                border: '2px solid #02FF39',
                                borderRadius: '16px',
                                backgroundColor: 'black',
                                color: 'white',
                                maxWidth: '400px',
                                height: 'max-content',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
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
                                        maxHeight: '120px', // Ajusta tamanho da imagem
                                        objectFit: 'cover',
                                    }}
                                />
                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                    {produto.nome}
                                </Typography>
                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                    Valor: {produto.valor}
                                </Typography>
                                <Button
                                    style={{
                                        background: '#FF8000',
                                        color: 'black',
                                        border: '2px solid black',
                                        borderRadius: '99px',
                                        marginTop: '10px',
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
    );
}

function CarouselProduto({ produtos }) {
    return (
        <Box style={{ maxHeight: 'min-content' }}>
            {Array(3).fill(0).map((_, index) => (
                <ProdutoGrid key={index} produtos={produtos} />
            ))}
        </Box>
    );
}

export default Carroussel;
