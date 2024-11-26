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
} from "@mui/material";
import { theme } from "./static/Utils";
import { useBackground } from "./static/UseBackGround";
import axios from "axios";

function CadastroNovosProdutos() {
    useBackground("favicon2.png");

    const [formData, setFormData] = useState({
        cnpj: "",
        lote: "",
        name: "",
        quantidade: "",
        tamanho: "",
        cor: "",
    });

    const [errors, setErrors] = useState({});
    const [isCnpjValid, setIsCnpjValid] = useState(false); // Estado para controlar a validação do CNPJ

    // Atualizar o estado do formulário conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Função para verificar se o CNPJ já está cadastrado no banco
    const checkCnpj = async () => {
        if (formData.cnpj.length === 14) { // Verifica o CNPJ somente quando ele tiver 14 caracteres
            try {
                const response = await axios.get(`http://localhost:5000/checkCNPJ/${formData.cnpj}`);
                if (response.data.exists) {
                    setIsCnpjValid(true); // CNPJ existe, podemos liberar os campos
                } else {
                    setIsCnpjValid(false); // CNPJ não encontrado
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        cnpj: "CNPJ não encontrado no banco de dados.",
                    }));
                }
            } catch (error) {
                console.error("Erro ao verificar o CNPJ:", error);
                setIsCnpjValid(false);
            }
        }
    };

    // Validar os dados antes de enviar
    const validate = () => {
        const newErrors = {};

        if (!formData.cnpj.trim()) {
            newErrors.cnpj = "CNPJ é obrigatório.";
        } else if (!/^\d{14g}$/.test(formData.cnpj)) {
            newErrors.cnpj = "O CNPJ deve conter exatamente 14 números.";
        }

        if (!isCnpjValid) {
            newErrors.cnpj = "O CNPJ deve ser válido para continuar.";
        }

        if (!formData.name.trim()) {
            newErrors.name = "O nome do item é obrigatório.";
        }

        if (!formData.quantidade.trim()) {
            newErrors.quantidade = "A quantidade é obrigatória.";
        }

        if (!formData.tamanho) {
            newErrors.tamanho = "O tamanho é obrigatório.";
        }

        if (!formData.cor) {
            newErrors.cor = "A cor é obrigatória.";
        }

        if (formData.lote && !isCnpjValid) {
            newErrors.lote = "O lote só pode ser informado se o CNPJ for válido.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log("Dados válidos:", formData);
        } else {
            console.log("Erro na validação:", errors);
        }
    };

    useEffect(() => {
        checkCnpj();
    }, [formData.cnpj]);

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="sm"
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                }}
            >
                <Box
                    component="form"
                    sx={{
                        width: "max-content",
                        bgcolor: "#fff",
                        borderRadius: "8px",
                        border: "2px solid #f3f3f3",
                        padding: 3,
                    }}
                >
                    <Typography variant="h2" gutterBottom textAlign={"center"} color="secondary">
                        Cadastro de Mercadoria
                    </Typography>

                    <TextField
                        label="CNPJ:"
                        name="cnpj"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formData.cnpj}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); // Remover tudo que não for número
                            if (value.length <= 14) {  // Limitar a 14 caracteres
                                setFormData({
                                    ...formData,
                                    cnpj: value,
                                });
                            }
                        }}
                        error={!!errors.cnpj}
                        helperText={errors.cnpj}
                    />

                    {/* Só mostrar os outros campos se o CNPJ for válido */}
                    {isCnpjValid && (
                        <>
                            <TextField
                                label="Número do Lote:"
                                name="lote"
                                fullWidth
                                color="secondary"
                                margin="normal"
                                value={formData.lote}
                                onChange={handleChange}
                                error={!!errors.lote}
                                helperText={errors.lote}
                            />

                            <TextField
                                label="Nome do Item:"
                                name="name"
                                fullWidth
                                color="secondary"
                                margin="normal"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />

                            <TextField
                                label="Quantidade do Item:"
                                name="quantidade"
                                fullWidth
                                color="secondary"
                                margin="normal"
                                value={formData.quantidade}
                                onChange={handleChange}
                                error={!!errors.quantidade}
                                helperText={errors.quantidade}
                            />

                            {/* Select para Tamanho */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Tamanho</InputLabel>
                                <Select
                                    name="tamanho"
                                    value={formData.tamanho}
                                    onChange={handleChange}
                                    error={!!errors.tamanho}
                                >
                                    {[38, 39, 40, 41].map((size) => (
                                        <MenuItem key={size} value={size}>
                                            {size}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.tamanho && <Typography color="error">{errors.tamanho}</Typography>}
                            </FormControl>

                            {/* Select para Cor */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Cor</InputLabel>
                                <Select
                                    name="cor"
                                    value={formData.cor}
                                    onChange={handleChange}
                                    error={!!errors.cor}
                                >
                                    {["Preto", "Azul", "Branco"].map((color) => (
                                        <MenuItem key={color} value={color}>
                                            {color}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.cor && <Typography color="error">{errors.cor}</Typography>}
                            </FormControl>
                        </>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                        disabled={!isCnpjValid} // Desabilitar o botão de cadastro até o CNPJ ser validado
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CadastroNovosProdutos;
