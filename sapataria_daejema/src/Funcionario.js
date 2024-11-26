import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "./static/Utils";
import { ThemeProvider } from '@mui/material/styles';
import { useBackground } from "./static/UseBackGround";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Funcionario() {
    useBackground('favicon2.png');

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalButtons, setModalButtons] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/produto/produtos', {
                headers: { "Content-Type": "application/json" }
            });
            console.log(response.data);
            setProdutos(response.data);
        } catch (erro) {
            console.log("Erro ao carregar os produtos: ", erro);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const handleOpenModal = (content) => {
        setModalContent(content);
        if (content === 'Cadastrar') {
            setModalButtons([
                { text: 'Cadastrar Fornecedor', action: () => navigate('/cadastroFornecedor') },
                { text: 'Cadastrar Produto', action: () => navigate('/cadastroNovosProdutos') },
            ]);
        } else if (content === 'Relatórios') {
            setModalButtons([
                { text: 'Relatórios de Mercadoria Mais Vendidos', action: () => console.log('Relatórios de Mercadoria Mais Vendidos') },
                { text: 'Mercadoria Esgotando', action: () => console.log('Mercadoria Esgotando') },
            ]);
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <IconButton
                onClick={() => toggleDrawer(true)}
                style={{
                    position: 'fixed',
                    left: '30px',
                    cursor: 'pointer'
                }}
            >
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
                        height: "fill",
                        display: 'flex',
                        marginTop: '20px',
                        backgroundColor: "solid",
                        color: "black",
                    },
                }}
            >
                <List style={{ margin: "50px 30px", cursor:'pointer' }}>
                    <ListItem button onClick={() => handleOpenModal('Relatórios')}>
                        <ListItemText primary="Relatórios" />
                    </ListItem>

                    <ListItem button onClick={() => handleOpenModal('Cadastrar')}>
                        <ListItemText primary="Cadastros" />
                    </ListItem>

                    <ListItem button onClick={() => navigate('/adicionarMercadoria')}>
                        <ListItemText primary="Adicionar Mercadoria" />
                    </ListItem>
                </List>
            </Drawer>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        {modalContent}
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Selecione uma das opções abaixo.
                    </Typography>

                    {modalButtons.map((button, index) => (
                        <Button
                            key={index}
                            onClick={button.action}
                            variant="contained"
                            sx={{
                                color:"#fff",
                                bgcolor: '#1b4d93',
                                mt: 2,
                                display: 'block',
                                width: 'max-content' }}
                        >
                            {button.text}
                        </Button>
                    ))}

                    <Button
                        onClick={handleCloseModal}
                        color="secondary"
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        Fechar
                    </Button>
                </Box>
            </Modal>

            <Box sx={{ width: '80%', margin: '20px auto' }}>
                <Typography variant="h1" gutterBottom align="center">
                    Tabela de Mercadoria
                </Typography>
                <TableContainer component={Paper} sx={{ border: '2px solid #1b4d93' }}>
                    <Table sx={{ border: '2px solid black' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ border: '2px solid #1b4d93' }}><strong>Nome do Item</strong></TableCell>
                                <TableCell align="center" sx={{ border: '2px solid #1b4d93' }}><strong>Preço Unitário</strong></TableCell>
                                <TableCell align="center" sx={{ border: '2px solid #1b4d93' }}><strong>Quantidade do Item</strong></TableCell>
                                <TableCell align="center" sx={{ border: '2px solid #1b4d93' }}><strong>Quantidade no Estoque</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {produtos.map((produto, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center" sx={{ border: '2px solid #1b4d93' }}>{produto.nome_prod}</TableCell>
                                    <TableCell align="center" sx={{ border: '2px solid #1b4d93' }}>R${produto.preco_unit}</TableCell>
                                    <TableCell align="center" sx={{ border: '2px solid #1b4d93' }}>{produto.quantidade}</TableCell>
                                    <TableCell align="center" sx={{ border: '2px solid #1b4d93' }}>{produto.estoque}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </ThemeProvider>
    );
}

export default Funcionario;
