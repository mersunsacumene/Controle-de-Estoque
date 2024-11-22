import React from "react";
import { TextField, Button, Typography, Container, Box, ThemeProvider } from "@mui/material";
import { theme } from "./static/Utils";
import { useNavigate } from "react-router-dom";
import {useBackground} from "./static/UseBackGround";


function CadastroNovosProdutos() {
    useBackground('favicon2.png');

    const navigate = useNavigate();
    navigate("/")
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
                    sx={{
                        mt: 4,
                        bgcolor: "#fff",
                        borderRadius: "8px",
                        padding: 3,
                    }}
                >
                    <Typography variant="h1" gutterBottom textAlign={"center"} color="secondary">
                        Cadastro de Novos Produtos
                    </Typography>

                    <TextField
                        label="Nome Completo:"
                        name="nome"
                        fullWidth
                        color="secondary"
                        margin="normal"
                    />
                    <TextField
                        label="Email:"
                        name="email"
                        type="email"
                        fullWidth
                        color="secondary"
                        margin="normal"
                    />
                    <TextField
                        label="Confirma Email:"
                        name="confirmaEmail"
                        type="email"
                        fullWidth
                        color="secondary"
                        margin="normal"
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

export default CadastroNovosProdutos;
