import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Card, CardContent, Typography, Button, Grid2 } from '@mui/material';
import one from "./static/image1.png";

const produtos = new Array(16).fill({
    evento:'Promoção',
    nome: 'Sandália de Moisés',
    valor: '19,99',
    imagem: one,
});

const agruparProdutos = (produtos, tamanhoGrupo) => {
    const grupos = [];
    for (let i = 0; i < produtos.length; i += tamanhoGrupo) {
        grupos.push(produtos.slice(i, i + tamanhoGrupo));
    }
    return grupos;
};

function Carroussel() {
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
                    marginTop: '700px',
                    justifyContent: 'center',
                },
            }}
            indicatorIconButtonProps={{
                style: {
                    padding: '5px',
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
            <Grid2 container spacing={2} sx={{ width: "70%" }}>
                {produtos.map((produto, index) => (
                    <Grid2 item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                marginTop: '120px',
                                border: '2px solid #02FF39',
                                borderRadius: '24px',
                                backgroundColor: 'black',
                                color: 'white',
                            }}
                        >
                            <CardContent style={{ textAlign: 'center' }}>
                                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                    {produto.evento}
                                </Typography>
                                <Box
                                    component="img"
                                    src={produto.imagem}
                                    alt={produto.nome}
                                    sx={{ maxWidth: '100%', height: 'auto', marginBottom: 2 }}
                                />
                                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                    {produto.nome}
                                </Typography>
                                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
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
        <Box style={{ maxHeight: '100vh' }}>
            {Array(3).fill(0).map((_, index) => (
                <ProdutoGrid key={index} produtos={produtos} />
            ))}
        </Box>
    );
}

export default Carroussel;
