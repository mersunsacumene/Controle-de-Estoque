import React, {useEffect, useState} from 'react';
import {Box, Grid2} from "@mui/material";
import { Card, CardContent, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {  theme } from "./static/Utils";
import { ThemeProvider} from '@mui/material/styles';
import {useBackground} from "./static/UseBackGround";
import axios from 'axios';

function Produtos() {
    useBackground('favicon2.png');

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);

    const fetchProducts = async () => {

        try{
        const response = await axios.get('http://localhost:5000/produto/produtos',{
        headers:{"Content-Type": "application/json"}
        })
        console.log(response.data)
        setProdutos(response.data);
    }catch (erro){
            console.log("Erro ao carregar os produtos: ",erro);
        }
    };

    useEffect(() => {
        fetchProducts();
    },[]);

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };
    return (
        <ThemeProvider theme={theme}>
            <IconButton onClick={() => toggleDrawer(true)} style={{ position: 'fixed', marginTop: '90px', left: '30px', cursor: 'pointer' }}>
                <MenuIcon /> <label>Menu</label>
            </IconButton>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 280,
                        marginTop: '65px',
                        backgroundColor: "solid",
                        color:"black",
                    }, }}
            >
                <List style={{margin:"50px 30px"}}>
                    <ListItem button>
                        <ListItemText primary="Tenis Futsal" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Chuteira Campo" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Sapato Social" />
                    </ListItem>
                </List>
            </Drawer>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Grid2 container spacing={2} width= "80%" >
                {produtos.map((produto, index) => (
                    <Grid2 item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                marginTop: '120px',
                                border: '2px solid #02FF39',
                                borderRadius: '24px',
                            }}
                        >
                            <CardContent style={{ textAlign: 'center' }}>
                                <Typography component="img" src={`http://localhost:5000${produto.imagem_url}`} alt={produto.nome_prod} sx={{ width: '20%', objectFit: 'cover' }} />
                                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                    {produto.nome_prod}
                                </Typography>
                                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                    Valor Unitário: R${produto.preco_unit}
                                </Typography>
                                <Button
                                    style={{
                                        background: '#FF8000',
                                        color: 'black',
                                        border: '2px solid black',
                                        borderRadius: '99px',
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

        </ThemeProvider>
    );
}

export default Produtos;