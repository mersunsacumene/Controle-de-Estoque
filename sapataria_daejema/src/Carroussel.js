import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';

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

    // Simulação de 20 produtos
    useEffect(() => {
        // Simulando 20 produtos com imagens, nomes e valores
        const simulado = Array.from({ length: 20 }, (_, index) => ({
            evento: 'Promoção',
            nome: `Produto ${index + 1}`,
            valor: `R$ ${(index + 1) * 10},00`,
            imagem: '/path/to/image.jpg', // Aqui você pode colocar uma URL de imagem real ou usar uma imagem genérica
        }));
        setProdutos(simulado);
    }, []);

    // Agrupar produtos em lotes de 4
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
                <Box key={index} sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    <ProdutoGrid produtos={lote} />
                </Box>
            ))}
        </Carousel>
    );
}

function ProdutoGrid({ produtos }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                height:'max-content',
                alignItems: 'center',
                gap: 2, // Espaçamento entre os itens
                overflowX: 'auto', // Rolagem horizontal para telas pequenas
                padding: 2,
            }}
        >
            {produtos.map((produto, index) => (
                <Card
                    key={index}
                    sx={{
                        border: '2px solid #02FF39',
                        borderRadius: '16px',
                        backgroundColor: 'black',
                        color: 'white',
                        width: '250px', // Largura fixa de cada card
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
                        <Button
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
            ))}
        </Box>
    );
}

export default Carroussel;
