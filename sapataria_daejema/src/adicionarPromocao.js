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
        valor: "",
        id_prod: "",
        data_fim: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Carregar os produtos do backend
        axios
            .get("http://localhost:5000/estoque/produtosEstoque")
            .then((response) => {
                setProdutos(response.data);
                console.log("Produtos carregados:", response.data);
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

            if (name === "id_prod" && value) {
                const selectedProduct = produtos.find(
                    (produto) => produto.produto.id_prod === value
                );

                if (selectedProduct) {
                    updatedValues.preco = selectedProduct.produto.preco_unit;

                    const desconto = 0.2;
                    updatedValues.valor = (
                        selectedProduct.produto.preco_unit * (1 - desconto)
                    ).toFixed(2);
                }
            }

            return updatedValues;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!formValues.id_prod) errors.id_prod = "Selecione o produto.";
        if (!formValues.preco) errors.preco = "Informe o preço do item.";
        if (!formValues.data_fim) errors.data_fim = "Informe a data final da promoção.";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            axios
                .post("http://localhost:5000/promocao/cadastro", formValues)
                .then((response) => {
                    console.log("Promoção adicionada com sucesso:", response.data);
                    setMessage("Promoção adicionada com sucesso!");
                    setFormValues({
                        valor: "",
                        id_prod: "",
                        data_fim: "",
                    });
                })
                .catch((error) => {
                    console.error("Erro ao adicionar promoção:", error, formValues["valor"]);
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

                    <FormControl fullWidth margin="normal" error={!!formErrors.id_prod}>
                        <InputLabel id="produto-select-label">Produto</InputLabel>
                        <Select
                            labelId="produto-select-label"
                            id="id_prod"
                            name="id_prod"
                            value={formValues.id_prod}
                            onChange={handleChange}
                            label="Produto"
                        >
                            {loading ? (
                                <MenuItem value="">Carregando...</MenuItem>
                            ) : (
                                produtos.map((produto) => (
                                    <MenuItem key={produto.produto.id_prod} value={produto.produto.id_prod}>
                                        {produto.produto.nome_prod}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                        {formErrors.id_prod && (
                            <Typography variant="body2" color="error">
                                {formErrors.id_prod}
                            </Typography>
                        )}
                    </FormControl>

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
                        disabled
                    />

                    <TextField
                        label="Preço com 20% de Desconto (R$)"
                        name="valor"
                        type="text"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.valor}
                        disabled
                    />

                    <TextField
                        label="Data Final da Promoção"
                        name="data_fim"
                        type="date"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.data_fim}
                        onChange={handleChange}
                        error={!!formErrors.data_fim}
                        helperText={formErrors.data_fim}
                        InputLabelProps={{ shrink: true }}
                    />

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
