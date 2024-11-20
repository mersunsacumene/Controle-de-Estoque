import React, { useEffect, useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Card,
    CardContent,
    Typography,
    Button,
    Grid2,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './static/Utils';
import { useBackground } from './static/UseBackGround';
import axios from 'axios';
import one from "./static/Sapato.png";  // Importa a imagem

const categorias = [
    { id: 1, nome: 'Tenis Futsal' },
    { id: 2, nome: 'Chuteira Campo' },
    { id: 3, nome: 'Sapato Social' },
];

const initialProduct = {
    cnpj: '',
    nomeProduto: '',
    precoUnitario: '',
    lote: '',
    urlImagem: '',
};

function Produtos() {
    useBackground('favicon2.png');

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [novoProduto, setNovoProduto] = useState(initialProduct);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/produto/produtos', {
                    headers: { 'Content-Type': 'application/json' },
                });
                setProdutos(response.data);
                setProdutosFiltrados(response.data);
            } catch (error) {
                console.error('Erro ao carregar os produtos:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleCategoriaSelect = (categoriaId) => {
        setCategoriaSelecionada(categoriaId);
        if (categoriaId === null) {
            setProdutosFiltrados(produtos);
        } else {
            setProdutosFiltrados(
                produtos.filter((produto) => produto.categoriaId === categoriaId)
            );
        }
    };

    const handleModalToggle = () => {
        setOpenModal(!openModal);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoProduto({ ...novoProduto, [name]: value });
    };

    const handleSaveProduct = () => {
        console.log('Salvar produto:', novoProduto);
        setNovoProduto(initialProduct);
        handleModalToggle();
    };

    return (
        <ThemeProvider theme={theme}>
            <MenuButton onToggleDrawer={() => setDrawerOpen(true)} />
            <CategoryDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                categorias={categorias}
                onSelectCategory={handleCategoriaSelect}
                onAddProduct={handleModalToggle}
            />
            <ProductGrid produtos={produtosFiltrados} />

            <Dialog open={openModal} onClose={handleModalToggle}>
                <DialogTitle>Cadastrar Nova Mercadoria</DialogTitle>
                <DialogContent>
                    {['cnpj', 'nomeProduto', 'precoUnitario', 'lote', 'urlImagem'].map((field) => (
                        <TextField
                            key={field}
                            label={field.replace(/([A-Z])/g, ' $1').trim()}
                            name={field}
                            value={novoProduto[field]}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalToggle} color="secondary" variant="contained">
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveProduct} color="secondary" variant="contained">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}

function MenuButton({ onToggleDrawer }) {
    return (
        <IconButton
            onClick={onToggleDrawer}
            style={{ position: 'fixed', marginTop: '90px', left: '30px', cursor: 'pointer' }}
        >
            <MenuIcon />
            <label>Menu</label>
        </IconButton>
    );
}

function CategoryDrawer({ open, onClose, categorias, onSelectCategory, onAddProduct }) {
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 280,
                    marginTop: '65px',
                    height: '95%',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <List style={{ margin: '50px 30px' }}>
                <ListItem button onClick={() => onSelectCategory(null)}>
                    <ListItemText primary="Todos os Produtos" />
                </ListItem>
                {categorias.map((categoria) => (
                    <ListItem button key={categoria.id} onClick={() => onSelectCategory(categoria.id)}>
                        <ListItemText primary={categoria.nome} />
                    </ListItem>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ margin: '30px', textAlign: 'center' }}>
                <Button
                    style={{
                        background: '#FF8000',
                        color: 'black',
                        border: '2px solid black',
                        borderRadius: '99px',
                        width: '100%',
                    }}
                    onClick={onAddProduct}
                >
                    Adicionar Mercadoria
                </Button>
            </Box>
        </Drawer>
    );
}

function ProductGrid({ produtos }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Grid2 container spacing={2} width="80%">
                {produtos.map((produto, index) => (
                    <Grid2 item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ marginTop: '20px', border: '2px solid #02FF39', borderRadius: '24px' }}>
                            <CardContent style={{ textAlign: 'center' }}>
                                <Typography
                                    component="img"
                                    src={one}
                                    alt={produto.nome_prod}
                                    sx={{ width: '100%', objectFit: 'cover' }}
                                />
                                <Typography variant="h5">{produto.nome_prod}</Typography>
                                <Typography variant="h6">Valor: R${produto.preco_unit}</Typography>
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
    );
}

export default Produtos;
