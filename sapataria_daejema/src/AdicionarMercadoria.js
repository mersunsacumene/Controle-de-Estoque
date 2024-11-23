import React, { useState } from "react";
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
} from "@mui/material";
import { theme } from "./static/Utils";
import { useBackground } from "./static/UseBackGround";

function AdicionarMercadoria() {
    useBackground("favicon2.png");

    const [formValues, setFormValues] = useState({
        cnpj: "",
        lote: "",
        nome: "",
        quantidade: "",
        preco: "",
        tamanho: "",
        cor: "",
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!formValues.cnpj) errors.cnpj = "Selecione o CNPJ.";
        if (!formValues.lote) errors.lote = "Selecione o lote.";
        if (!formValues.nome) errors.nome = "Informe o nome do item.";
        if (!formValues.quantidade) errors.quantidade = "Informe a quantidade.";
        if (!formValues.preco) errors.preco = "Informe o preço.";
        if (!formValues.tamanho) errors.tamanho = "Selecione o tamanho.";
        if (!formValues.cor) errors.cor = "Selecione a cor.";

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
                        Adicionar Mercadoria
                    </Typography>

                    <FormControl fullWidth margin="normal" color="secondary">
                        <InputLabel sx={{ top: "-10px", fontSize: "14px" }}>CNPJ</InputLabel>
                        <Select
                            name="cnpj"
                            value={formValues.cnpj}
                            onChange={handleChange}
                            sx={{
                                "& .MuiInputBase-input": {
                                    paddingTop: "10px",
                                },
                            }}
                        >
                            <MenuItem value="" disabled>
                                Selecione um CNPJ
                            </MenuItem>
                            <MenuItem value="12345678901234">12345678901234</MenuItem>
                            <MenuItem value="98765432109876">98765432109876</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" color="secondary">
                        <InputLabel sx={{ top: "-10px", fontSize: "14px" }}>Lote</InputLabel>
                        <Select
                            name="lote"
                            value={formValues.lote}
                            onChange={handleChange}
                            error={!!formErrors.lote}
                            sx={{
                                "& .MuiInputBase-input": {
                                    paddingTop: "10px",
                                },
                            }}
                        >
                            <MenuItem value="" disabled>
                                Selecione um Lote
                            </MenuItem>
                            <MenuItem value="Lote 1">Lote 1</MenuItem>
                            <MenuItem value="Lote 2">Lote 2</MenuItem>
                        </Select>
                        {formErrors.lote && (
                        <Typography color="error" variant="caption">
                            {formErrors.lote}
                        </Typography>
                    )}
                    </FormControl>

                    <TextField
                        label="Nome do Item"
                        name="nome"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.nome}
                        onChange={handleChange}
                        error={!!formErrors.nome}
                        helperText={formErrors.nome}
                    />

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

                    <TextField
                        label="Preço"
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
                    <FormControl fullWidth margin="normal" color="secondary">
                        <InputLabel sx={{ top: "-10px", fontSize: "14px" }}>Tamanho</InputLabel>
                        <Select
                            name="tamanho"
                            value={formValues.tamanho}
                            onChange={handleChange}
                            error={!!formErrors.tamanho}
                            sx={{
                                "& .MuiInputBase-input": {
                                    paddingTop: "10px",
                                },
                            }}
                        >
                            {[33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44].map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                            {formErrors.tamanho && (
                                <Typography color="error" variant="caption">
                                    {formErrors.tamanho}
                                </Typography>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" color="secondary">
                        <InputLabel sx={{ top: "-10px", fontSize: "14px" }}>Cor</InputLabel>
                        <Select
                            name="cor"
                            value={formValues.cor}
                            onChange={handleChange}
                            error={!!formErrors.cor}
                            sx={{
                                "& .MuiInputBase-input": {
                                    paddingTop: "10px",
                                },
                            }}
                        >
                            {["Preto", "Branco", "Vermelho", "Azul", "Verde", "Amarelo"].map(
                            (color) => (
                                <MenuItem key={color} value={color}>
                                    {color}
                                </MenuItem>
                            )
                        )}
                            {formErrors.cor && (
                                <Typography color="error" variant="caption">
                                    {formErrors.cor}
                                </Typography>
                            )}
                            </Select>
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
            </Container>
        </ThemeProvider>
    );
}

export default AdicionarMercadoria;
