import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, ThemeProvider } from "@mui/material";
import { theme } from "./static/Utils";
import { useBackground } from "./static/UseBackGround";

function CadastroNovosProdutos() {
    useBackground('favicon2.png');

    const [formData, setFormData] = useState({
        cnpj: "",
        name: "",
        email: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.cnpj.trim()) {
            newErrors.cnpj = "CNPJ é obrigatório.";
        } else if (!/^\d{14}$/.test(formData.cnpj)) {
            newErrors.cnpj = "CNPJ deve conter 14 números.";
        }

        if (!formData.name.trim()) {
            newErrors.name = "O nome é obrigatório.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "O email é obrigatório.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "O email não é válido.";
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

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="sm"
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                }}
            >
                <Box
                    component="form"
                    sx={{
                        width: 'max-content',
                        bgcolor: "#fff",
                        borderRadius: "8px",
                        border: "2px solid #f3f3f3",
                        padding: 3,
                    }}
                >
                    <Typography variant="h2" gutterBottom textAlign={"center"} color="secondary">
                        Cadastro de Fornecedor
                    </Typography>

                    <TextField
                        label="CNPJ:"
                        name="cnpj"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formData.cnpj}
                        onChange={handleChange}
                        error={!!errors.cnpj}
                        helperText={errors.cnpj}
                    />
                    <TextField
                        label="Nome Completo:"
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
                        label="Email:"
                        name="email"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CadastroNovosProdutos;
