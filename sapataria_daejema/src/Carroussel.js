import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';

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
            imagem: 'Sapato.png', // Aqui você pode colocar uma URL de imagem real ou usar uma imagem genérica
        }));
        setProdutos(simulado);
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
                    <ProdutoGrid produtos={lote} />
                </Box>
            ))}
        </Carousel>
    );
}

function ProdutoGrid({ produtos }) {
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
                            border: '2px solid #02FF39',
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
                </Grid>
            ))}
        </Grid>
    );
}

export default Carroussel;
