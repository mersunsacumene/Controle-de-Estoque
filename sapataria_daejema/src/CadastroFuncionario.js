import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, ThemeProvider, IconButton, InputAdornment } from "@mui/material";
import { formatCPF, theme, formatPhone, isValidCPF, isValidPhone } from "./static/Utils";
import { useNavigate } from "react-router-dom";
import { mockCadastroFuncionario } from "./static/MockService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {useBackground} from "./static/UseBackGround"; // Ícones para mostrar/esconder a senha

function CadastroFuncionario() {
    useBackground('favicon2.png');
    const [formValues, setFormValues] = useState({
        nome: "",
        cpf: "",
        telefone: "",
        email: "",
        confirmaEmail: "",
        senha: "",
        confirmacaoSenha: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmSenha, setShowConfirmSenha] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        let formattedValue = value;

        if (name === "cpf") {
            formattedValue = formatCPF(value);
        } else if (name === "telefone") {
            formattedValue = formatPhone(value);
        }

        setFormValues({ ...formValues, [name]: formattedValue });
    };

    const validateForm = () => {
        let errors = {};

        if (!formValues.nome) errors.nome = "Nome é obrigatório";
        if (!formValues.cpf) {
            errors.cpf = "CPF é obrigatório";
        } else if (!isValidCPF(formValues.cpf)) {
            errors.cpf = "CPF inválido";
        }

        if (!formValues.telefone) {
            errors.telefone = "Telefone é obrigatório";
        } else if (!isValidPhone(formValues.telefone)) {
            errors.telefone = "Telefone inválido";
        }

        if (!formValues.email) {
            errors.email = "Email é obrigatório";
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = "Insira um email válido";
        }

        if (formValues.confirmaEmail !== formValues.email) {
            errors.confirmaEmail = "Emails não coincidem";
        }

        if (!formValues.senha) {
            errors.senha = "Senha é obrigatória";
        } else if (formValues.senha.length < 6) {
            errors.senha = "A senha deve ter pelo menos 6 caracteres";
        }

        if (!formValues.confirmacaoSenha) {
            errors.confirmacaoSenha = "Confirmação de senha é obrigatória";
        } else if (formValues.senha !== formValues.confirmacaoSenha) {
            errors.confirmacaoSenha = "As senhas não coincidem";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const result = mockCadastroFuncionario(formValues);
            if (result.success) {
                setMessage(result.message);

                alert("Cadastro realizado com sucesso!");

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setMessage(result.message);
            }

            setFormValues({
                nome: "",
                cpf: "",
                telefone: "",
                email: "",
                confirmaEmail: "",
                senha: "",
                confirmacaoSenha: "",
            });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" sx={{ marginTop: "3%", borderRadius: "12px", padding: "16px" }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, bgcolor: "#fff", borderRadius: "8px", padding: 3 }}>
                    <Typography variant="h1" gutterBottom textAlign={"center"} color="secondary">
                        Cadastro
                    </Typography>
                    {message && (
                        <Typography variant="h6" color={message.startsWith("Cadastro") ? "green" : "red"} textAlign="center">
                            {message}
                        </Typography>
                    )}
                    <TextField
                        label="Nome Completo:"
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
                        label="CPF:"
                        name="cpf"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.cpf}
                        onChange={handleChange}
                        error={!!formErrors.cpf}
                        helperText={formErrors.cpf}
                    />
                    <TextField
                        label="Telefone:"
                        name="telefone"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.telefone}
                        onChange={handleChange}
                        error={!!formErrors.telefone}
                        helperText={formErrors.telefone}
                    />
                    <TextField
                        label="Email:"
                        name="email"
                        type="email"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.email}
                        onChange={handleChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                    />
                    <TextField
                        label="Confirma email:"
                        name="confirmaEmail"
                        type="email"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.confirmaEmail}
                        onChange={handleChange}
                        error={!!formErrors.confirmaEmail}
                        helperText={formErrors.confirmaEmail}
                    />

                    <TextField
                        label="Senha"
                        name="senha"
                        type={showSenha ? "text" : "password"} // Alterna entre 'text' e 'password'
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.senha}
                        onChange={handleChange}
                        error={!!formErrors.senha}
                        helperText={formErrors.senha}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowSenha(!showSenha)} edge="end">
                                        {showSenha ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Confirmação de Senha"
                        name="confirmacaoSenha"
                        type={showConfirmSenha ? "text" : "password"}
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formValues.confirmacaoSenha}
                        onChange={handleChange}
                        error={!!formErrors.confirmacaoSenha}
                        helperText={formErrors.confirmacaoSenha}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirmSenha(!showConfirmSenha)} edge="end">
                                        {showConfirmSenha ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 3 }}>
                        Cadastrar
                    </Button>

                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CadastroFuncionario;
