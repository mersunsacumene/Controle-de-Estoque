import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    ThemeProvider,
} from "@mui/material";
import { theme } from "./static/Utils";
import { useBackground } from "./static/UseBackGround";
import axios from "axios";

function AdicionarPromocao() {
    useBackground("favicon2.png");

    const [formValues, setFormValues] = useState({
        nome: "",
        preco: "",
        precoComDesconto: "",
        quantidade: "",
        produtoId: "",  // Armazenando o ID do produto escolhido
    });

    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState(""); // Para mostrar a mensagem de sucesso ou erro
    const [produtos, setProdutos] = useState([]); // Lista de produtos
    const [loading, setLoading] = useState(true); // Indicador de carregamento

    useEffect(() => {
        // Carregar os produtos do backend
        axios
            .get("http://localhost:5000/produtos") // Substitua pelo seu endpoint de produtos
            .then((response) => {
                setProdutos(response.data);  // Supondo que a resposta seja um array de produtos
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar os produtos:", error);
                setMessage("Erro ao carregar os produtos.");
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues((prevValues) => {
            const updatedValues = { ...prevValues, [name]: value };

            // Calcula o preço com desconto se o preço for atualizado
            if (name === "preco" && value) {
                const desconto = 0.2; // 20% de desconto
                const precoComDesconto = (value * (1 - desconto)).toFixed(2);
                updatedValues.precoComDesconto = precoComDesconto;
            }

            return updatedValues;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!formValues.produtoId) errors.produtoId = "Selecione o produto.";
        if (!formValues.preco) errors.preco = "Informe o preço do item.";
        if (!formValues.quantidade) errors.quantidade = "Informe a quantidade do item.";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // Lógica para enviar os dados para o backend
            axios
                .post("http://localhost:5000/promocao/adicionar", formValues) // Substitua pelo seu endpoint real
                .then((response) => {
                    console.log("Produto adicionado com sucesso:", response.data);
                    setMessage("Promoção adicionada com sucesso!");
                    // Limpa os campos após o envio
                    setFormValues({
                        nome: "",
                        preco: "",
                        precoComDesconto: "",
                        quantidade: "",
                        produtoId: "",
                    });
                })
                .catch((error) => {
                    console.error("Erro ao adicionar produto:", error);
                    setMessage("Erro ao adicionar a promoção. Tente novamente.");
                });
        }
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
                        Adicionar Promoção
                    </Typography>

                    {/* Campo Seleção de Produto */}
                    <FormControl fullWidth margin="normal" error={!!formErrors.produtoId}>
                        <InputLabel id="produto-select-label">Produto</InputLabel>
                        <Select
                            labelId="produto-select-label"
                            id="produtoId"
                            name="produtoId"
                            value={formValues.produtoId}
                            onChange={handleChange}
                            label="Produto"
                        >
                            {loading ? (
                                <MenuItem value="">Carregando...</MenuItem>
                            ) : (
                                produtos.map((produto) => (
                                    <MenuItem key={produto.id} value={produto.id}>
                                        {produto.nome}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                        {formErrors.produtoId && (
                            <Typography variant="body2" color="error">
                                {formErrors.produtoId}
                            </Typography>
                        )}
                    </FormControl>

                    {/* Campo Preço */}
                    <TextField
                        label="Preço do Item (R$)"
                        name="preco"
                        type="number"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.preco}
                        onChange={handleChange}
                        error={!!formErrors.preco}
                        helperText={formErrors.preco}
                    />

                    {/* Campo Preço com Desconto */}
                    <TextField
                        label="Preço com 20% de Desconto (R$)"
                        name="precoComDesconto"
                        type="text"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.precoComDesconto}
                        disabled
                    />

                    {/* Mensagem de Sucesso ou Erro */}
                    {message && (
                        <Typography
                            variant="body1"
                            color={message.includes("sucesso") ? "green" : "red"}
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            {message}
                        </Typography>
                    )}

                    {/* Botão para Submeter */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Adicionar Promoção
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default AdicionarPromocao;
