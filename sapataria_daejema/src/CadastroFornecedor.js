import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, ThemeProvider } from "@mui/material";
import { theme } from "./static/Utils";
import { useBackground } from "./static/UseBackGround";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CadastroNovosProdutos() {
    useBackground('favicon2.png');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cnpj: "",
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


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Dados válidos:", formData);
            const response = await axios.post("http://127.0.0.1:5000/fornecedor/cadastro", {
                cnpj: formData.cnpj,
            },{headers: { "Content-Type": "application/json" } });
            if (response.data.message) {
                alert(response.data.message);
                navigate('/funcionario')
            }
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
