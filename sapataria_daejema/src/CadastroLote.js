import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, ThemeProvider, MenuItem } from "@mui/material";
import { theme } from "./static/Utils";
import { useNavigate } from "react-router-dom";
import { useBackground } from "./static/UseBackGround";

function CadastroLote() {
    useBackground("favicon2.png");

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        num_lote: "",
        id_forn: "",
        data_entrada: "",
        quant_recebida: "",
        tipo_recebido: "",
    });

    const [fornecedores, setFornecedores] = useState([]);

    // Busca os fornecedores no backend
    React.useEffect(() => {
        const fetchFornecedores = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/fornecedor/fornecedores",{
                    method: "GET",
                        headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setFornecedores(data);
                } else {
                    console.error("Erro ao buscar fornecedores");
                }
            } catch (error) {
                console.error("Erro ao conectar com o backend:", error);
            }
        };

        fetchFornecedores();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/lote/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Lote cadastrado com sucesso!");
                navigate("/funcionario");
            } else {
                const errorMsg = await response.text();
                console.log(formData.num_lote)
                alert(`Erro ao cadastrar lote: ${errorMsg}`);
            }
        } catch (error) {
            alert(`Erro ao conectar com o servidor: ${error.message}`);
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
                    sx={{
                        mt: 4,
                        bgcolor: "#fff",
                        borderRadius: "8px",
                        padding: 3,
                    }}
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h1" gutterBottom textAlign="center" color="secondary">
                        Cadastro de Lote
                    </Typography>

                    <TextField
                        label="Número do Lote"
                        name="num_lote"
                        value={formData.num_lote}
                        onChange={handleChange}
                        fullWidth
                        color="secondary"
                        margin="normal"
                        required
                    />

                    <TextField
                        select
                        label="Fornecedor"
                        name="id_forn"
                        value={formData.id_forn}
                        onChange={handleChange}
                        fullWidth
                        color="secondary"
                        margin="normal"
                        required
                    >
                        {fornecedores.map((fornecedor) => (
                            <MenuItem key={fornecedor.id_forn} value={fornecedor.id_forn}>
                                {fornecedor.nome_forn}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Data de Entrada"
                        name="data_entrada"
                        type="date"
                        value={formData.data_entrada}
                        onChange={handleChange}
                        fullWidth
                        color="secondary"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />

                    <TextField
                        label="Quantidade Recebida"
                        name="quant_recebida"
                        type="number"
                        value={formData.quant_recebida}
                        onChange={handleChange}
                        fullWidth
                        color="secondary"
                        margin="normal"
                        required
                    />

                    <TextField
                        select
                        label="Tipo Recebido"
                        name="tipo_recebido"
                        value={formData.tipo_recebido}
                        onChange={handleChange}
                        fullWidth
                        color="secondary"
                        margin="normal"
                        required
                    >
                        <MenuItem value="tenis">Tênis</MenuItem>
                        <MenuItem value="bota">Bota</MenuItem>
                        <MenuItem value="chinelo">Chinelo</MenuItem>
                        <MenuItem value="chuteira">Chuteira</MenuItem>
                    </TextField>

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Cadastrar Lote
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CadastroLote;
