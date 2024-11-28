import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    ThemeProvider,
} from "@mui/material";
import { theme } from "./static/Utils";
import { useBackground } from "./static/UseBackGround";

function AdicionarPromocao() {
    useBackground("favicon2.png");

    const [formValues, setFormValues] = useState({
        nome: "",
        preco: "",
        precoComDesconto: "",
        quantidade: "",
    });

    const [formErrors, setFormErrors] = useState({});

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
        if (!formValues.nome) errors.nome = "Informe o nome do item.";
        if (!formValues.preco) errors.preco = "Informe o preço do item.";
        if (!formValues.quantidade) errors.quantidade = "Informe a quantidade do item.";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log("Formulário enviado:", formValues);
            // Lógica para enviar os dados para o backend aqui
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

                    {/* Campo Nome */}
                    <TextField
                        label="Produto"
                        name="produto"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.nome}
                        onChange={handleChange}
                        error={!!formErrors.nome}
                        helperText={formErrors.nome}
                    />

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

                    {/* Campo Quantidade */}
                    <TextField
                        label="Quantidade"
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
