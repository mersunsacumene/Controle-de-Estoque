import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Container, Box, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#02FF39',
    },
  },
});
function Cadastro() {
  const [formValues, setFormValues] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });

  const [formErrors, setFormErrors] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });
  useEffect(() => {
    document.body.style.backgroundImage = "url('favicon2.png')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundBlendMode = 'overlay';

    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

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
      alert("Cadastro realizado com sucesso!");
      setFormValues({ nome: "", email: "", senha: "", confirmacaoSenha: "" });
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
        <Typography variant="h1" gutterBottom textAlign={"center"} color="secondary">
          Cadastro
        </Typography>
        <TextField
          label="Nome"
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
          label="Email"
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
          label="Senha"
          name="senha"
          type="password"
          fullWidth
          color="secondary"
          margin="normal"
          value={formValues.senha}
          onChange={handleChange}
          error={!!formErrors.senha}
          helperText={formErrors.senha}
        />
        <TextField
          label="Confirmação de Senha"
          name="confirmacaoSenha"
          type="password"
          fullWidth
          color="secondary"
          margin="normal"
          value={formValues.confirmacaoSenha}
          onChange={handleChange}
          error={!!formErrors.confirmacaoSenha}
          helperText={formErrors.confirmacaoSenha}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Cadastrar
        </Button>
      </Box>
    </Container>
    </ThemeProvider>
  );
}

export default Cadastro;
