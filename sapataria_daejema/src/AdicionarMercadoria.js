import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    ThemeProvider,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Snackbar,
    Alert
} from "@mui/material";
import { theme } from "./static/Utils";
import { useBackground } from "./static/UseBackGround";

function AdicionarMercadoria() {
    useBackground("favicon2.png");

    const [formValues, setFormValues] = useState({
        produtoId: "",
        quantidade: "",
        estoqueDesejado: "",
    });

    const [produtos, setProdutos] = useState([]);
    const [estoques, setEstoques] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);  // Estado para o Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState("");  // Mensagem do Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");  // Severidade do Snackbar (success, error)

    // Fetch os produtos da API
    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:5000/produto/produtos');
                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProdutos();
    }, []);

    // Fetch os estoques filtrados com base no produtoId
    useEffect(() => {
        if (!formValues.produtoId) return;

        const fetchEstoques = async () => {
            try {
                const response = await fetch(`http://localhost:5000/estoque/produto/${formValues.produtoId}`);
                const data = await response.json();
                setEstoques(data);
            } catch (error) {
                console.error("Erro ao buscar estoques:", error);
            }
        };

        fetchEstoques();
    }, [formValues.produtoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!formValues.produtoId) errors.produtoId = "Selecione um produto.";
        if (!formValues.quantidade) errors.quantidade = "Informe a quantidade a ser adicionada.";
        if (!formValues.estoqueDesejado) errors.estoqueDesejado = "Selecione o número do estoque.";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                // Primeira requisição: Atualizar o estoque
                const updateEstoqueResponse = await fetch('http://localhost:5000/estoque/adicionar', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_estoque: formValues.estoqueDesejado,
                        quantidadeAdicionar: parseInt(formValues.quantidade),
                    }),
                });

                if (updateEstoqueResponse.ok) {
                    console.log("Estoque atualizado com sucesso.");

                    // Segunda requisição: Registrar movimentação de entrada
                    const entradaResponse = await fetch('http://localhost:5000/movimentacao/entrada', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id_estoque: formValues.estoqueDesejado,
                            quantidade: parseInt(formValues.quantidade),
                        }),
                    });

                    const entradaData = await entradaResponse.json();

                    if (entradaResponse.ok) {
                        console.log("Movimentação de entrada registrada com sucesso:", entradaData);

                        // Exibir Snackbar de sucesso
                        setSnackbarMessage("Mercadoria adicionada com sucesso!");
                        setSnackbarSeverity("success");
                        setOpenSnackbar(true);
                    } else {
                        console.error("Erro ao registrar movimentação de entrada:", entradaData.error);
                        setSnackbarMessage("Erro ao registrar movimentação de entrada.");
                        setSnackbarSeverity("error");
                        setOpenSnackbar(true);
                    }
                } else {
                    const updateEstoqueData = await updateEstoqueResponse.json();
                    console.error("Erro ao atualizar estoque:", updateEstoqueData.error);
                    setSnackbarMessage("Erro ao atualizar estoque.");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                setSnackbarMessage("Erro na requisição.");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="sm"
                sx={{
                    marginTop: "5%",
                    borderRadius: "12px",
                    padding: "16px",
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 4,
                        bgcolor: "#fff",
                        borderRadius: "8px",
                        padding: 3,
                    }}
                >
                    <Typography
                        variant="h3"
                        gutterBottom
                        textAlign={"center"}
                        color="secondary"
                    >
                        Adicionar Mercadoria
                    </Typography>

                    {/* Selecione o Produto */}
                    <FormControl fullWidth margin="normal" color="secondary">
                        <InputLabel sx={{ top: "-10px", fontSize: "14px" }}>Produto</InputLabel>
                        <Select
                            name="produtoId"
                            value={formValues.produtoId}
                            onChange={handleChange}
                            error={!!formErrors.produtoId}
                            sx={{
                                "& .MuiInputBase-input": {
                                    paddingTop: "10px",
                                },
                            }}
                        >
                            <MenuItem value="" disabled>
                                Selecione um Produto
                            </MenuItem>
                            {produtos.map((produto) => (
                                <MenuItem key={produto.id_prod} value={produto.id_prod}>
                                    {produto.nome_prod}
                                </MenuItem>
                            ))}
                        </Select>
                        {formErrors.produtoId && (
                            <Typography color="error" variant="caption">
                                {formErrors.produtoId}
                            </Typography>
                        )}
                    </FormControl>

                    {/* Quantidade a ser Adicionada */}
                    <TextField
                        label="Quantidade a ser adicionada"
                        name="quantidade"
                        type="number"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.quantidade}
                        onChange={handleChange}
                        error={!!formErrors.quantidade}
                        helperText={formErrors.quantidade}
                    />

                    {/* Estoque Desejado (Agora com informações completas do estoque) */}
                    <FormControl fullWidth margin="normal" color="secondary">
                        <InputLabel sx={{ top: "-10px", fontSize: "14px" }}>Número do Estoque</InputLabel>
                        <Select
                            name="estoqueDesejado"
                            value={formValues.estoqueDesejado}
                            onChange={handleChange}
                            error={!!formErrors.estoqueDesejado}
                            sx={{
                                "& .MuiInputBase-input": {
                                    paddingTop: "10px",
                                },
                            }}
                        >
                            <MenuItem value="" disabled>
                                Selecione o número do Estoque
                            </MenuItem>
                            {estoques.map((estoque) => (
                                <MenuItem key={estoque.id_estoque} value={estoque.id_estoque}>
                                    ID - {estoque.id_estoque} - Quantidade Atual - {estoque.quantidade}
                                </MenuItem>
                            ))}
                        </Select>
                        {formErrors.estoqueDesejado && (
                            <Typography color="error" variant="caption">
                                {formErrors.estoqueDesejado}
                            </Typography>
                        )}
                    </FormControl>

                    {/* Botão para Submeter */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Adicionar Mercadoria
                    </Button>
                </Box>

                {/* Snackbar de Sucesso/Error */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbarSeverity}
                        sx={{ width: '100%' }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}

export default AdicionarMercadoria;
