import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, ThemeProvider, IconButton, InputAdornment } from "@mui/material";
import { theme } from "./static/Utils";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useBackground } from "./static/UseBackGround";

function CadastroFuncionario() {
    useBackground('favicon2.png');
    const [formValues, setFormValues] = useState({
        nome: "",
        email: "",
        confirmaEmail: "",
        senha: "",
        confirmacaoSenha: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // Para controlar a cor da mensagem
    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmSenha, setShowConfirmSenha] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validateForm = () => {
        let errors = {};
        if (!formValues.nome) errors.nome = "Nome é obrigatório";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/usuario/cadastrarFuncionario', {
                    email: formValues.email,
                    password: formValues.senha,
                    primeiro_nome: formValues.nome.split(" ")[0],
                    ultimo_nome: formValues.nome.split(" ").slice(1).join(" "),
                }, { headers: { "Content-Type": "application/json" } });

                console.log('got', response.status, response.data);
                setMessage(response.data.message);
                setMessageType('success'); // Caso de sucesso
                setFormValues({
                    nome: "",
                    email: "",
                    confirmaEmail: "",
                    senha: "",
                    confirmacaoSenha: "",
                });
            } catch (error) {
                if (error.response) {
                    setMessage(error.response.data.error || "Erro ao cadastrar");
                    setMessageType('error'); // Caso de erro
                } else {
                    setMessage("Erro desconhecido");
                    setMessageType('error');
                }
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" sx={{ marginTop: "3%", borderRadius: "12px", padding: "16px" }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, bgcolor: "#fff", padding: 1 }}>
                    <Typography variant="h1" gutterBottom textAlign={"center"} color="secondary">
                        Cadastro
                    </Typography>

                    {/* Caixa de mensagem de erro/sucesso */}
                    {message && (
                        <Box
                            sx={{
                                bgcolor: messageType === 'error' ? '#fff' : 'green',
                                color: 'red',
                                padding: 2,
                                borderRadius: 1,
                                textAlign: 'center',
                                marginBottom: 2,
                            }}
                        >
                            <Typography variant="h6">{message}</Typography>
                        </Box>
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
                        type={showSenha ? "text" : "password"}
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
