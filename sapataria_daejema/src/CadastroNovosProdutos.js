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
        nome_prod: "",
        marca_prod: "",
        quantidade: "",
        tamanho: "",
        cor: "",
        quant_atual: "",
        quant_min: "",
        quant_max: "",
        genero: "",
        preco_unit: "",
        lote: "",
        imagem: null,
    });

    const [errors, setErrors] = useState({});
    const [lotes, setLotes] = useState([]);
    const [loadingLotes, setLoadingLotes] = useState(true);
    const [lotesError, setLotesError] = useState("");

    useEffect(() => {
        const fetchLotes = async () => {
            try {
                const response = await axios.get("http://localhost:5000/lote/lotes");
                setLotes(response.data);
                setLoadingLotes(false);
            } catch (error) {
                console.error("Erro ao buscar lotes:", error);
                setLotesError("Erro ao carregar lotes");
                setLoadingLotes(false);
            }
        };

        fetchLotes();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imagem") {
            setFormData((prevData) => ({
                ...prevData,
                imagem: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.nome_prod.trim()) {
            newErrors.nome_prod = "O nome do item é obrigatório.";
        }
        if (!formData.marca_prod.trim()) {
            newErrors.marca_prod = "A marca do produto é obrigatória.";
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
        if (!formData.quant_atual || formData.quant_atual <= 0) {
            newErrors.quant_atual = "A quantidade atual é obrigatória e deve ser maior que zero.";
        }
        if (!formData.quant_min || formData.quant_min <= 0) {
            newErrors.quant_min = "A quantidade mínima é obrigatória e deve ser maior que zero.";
        }
        if (!formData.quant_max || formData.quant_max <= 0) {
            newErrors.quant_max = "A quantidade máxima é obrigatória e deve ser maior que zero.";
        }
        if (!formData.lote) {
            newErrors.lote = "O número do lote é obrigatório.";
        }
        if (!formData.genero) {
            newErrors.genero = "O gênero é obrigatório.";
        }
        if (!formData.preco_unit || formData.preco_unit <= 0) {
            newErrors.preco_unit = "O preço unitário é obrigatório e deve ser maior que zero.";
        }
        if (!formData.imagem) {
            newErrors.imagem = "A imagem do produto é obrigatória.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append("nome_prod", formData.nome_prod);
                formDataToSend.append("quantidade", formData.quantidade);
                formDataToSend.append("marca_prod", formData.marca_prod)
                formDataToSend.append("preco_unit", formData.preco_unit);
                formDataToSend.append("quant_atual", formData.quant_atual);
                formDataToSend.append("quant_min", formData.quant_min);
                formDataToSend.append("quant_max", formData.quant_max);
                formDataToSend.append("cor", formData.cor);
                formDataToSend.append("tamanho", formData.tamanho);
                formDataToSend.append("genero", formData.genero);
                formDataToSend.append("num_lote", formData.lote.num_lote);
                formDataToSend.append("imagem", formData.imagem);

                const produtoResponse = await axios.post("http://localhost:5000/produto/cadastro", formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (produtoResponse.status === 201) {
                    const estoqueData = {
                        id_prod: produtoResponse.data.data,
                        quant_atual: formData.quant_atual,
                        quant_max: formData.quant_max,
                        quant_min: formData.quant_min,
                        cor: formData.cor,
                        tipo:formData.lote.tipo_recebido,
                        genero:formData.genero,
                        tamanho: formData.tamanho,
                    };

                    const estoqueResponse = await axios.post("http://localhost:5000/estoque/cadastro", estoqueData);

                    if (estoqueResponse.status === 201) {
                        alert("Produto e Estoque cadastrados com sucesso!");
                    } else {
                        alert("Erro ao cadastrar estoque.");
                    }
                }
            } catch (error) {
                console.error("Erro ao cadastrar produto e estoque:", error);
                alert("Erro ao cadastrar produto e estoque.");
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
                        label="Nome do Item:"
                        name="nome_prod"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formData.nome_prod}
                        onChange={handleChange}
                        error={!!errors.nome_prod}
                        helperText={errors.nome_prod}
                    />
                    <TextField
                        label="Marca do Produto"
                        name="marca_prod"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formData.marca_prod}
                        onChange={handleChange}
                        error={!!errors.marca_prod}
                        helperText={errors.marca_prod}
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

                    <TextField
                        label="Preço Unitário"
                        name="preco_unit"
                        type="number"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formData.preco_unit}
                        onChange={handleChange}
                        error={!!errors.preco_unit}
                        helperText={errors.preco_unit}
                    />

                    <TextField
                        label="Quantidade Atual"
                        name="quant_atual"
                        type="number"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formData.quant_atual}
                        onChange={handleChange}
                        error={!!errors.quant_atual}
                        helperText={errors.quant_atual}
                    />

                    <TextField
                        label="Quantidade Mínima"
                        name="quant_min"
                        type="number"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formData.quant_min}
                        onChange={handleChange}
                        error={!!errors.quant_min}
                        helperText={errors.quant_min}
                    />

                    <TextField
                        label="Quantidade Máxima"
                        name="quant_max"
                        type="number"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formData.quant_max}
                        onChange={handleChange}
                        error={!!errors.quant_max}
                        helperText={errors.quant_max}
                    />

                    <FormControl fullWidth margin="normal" error={!!errors.cor}>
                        <InputLabel>Cor</InputLabel>
                        <Select
                            label="Cor"
                            name="cor"
                            value={formData.cor}
                            onChange={handleChange}>
                            <MenuItem value="azul">Azul</MenuItem>
                            <MenuItem value="preto">Preto</MenuItem>
                            <MenuItem value="branco">Branco</MenuItem>
                        </Select>
                        {errors.cor && <Typography variant="body2">{errors.cor}</Typography>}
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.tamanho}>
                        <InputLabel>Tamanho</InputLabel>
                        <Select
                            label="Tamanho"
                            name="tamanho"
                            value={formData.tamanho}
                            onChange={handleChange}
                        >
                            <MenuItem value="38">38</MenuItem>
                            <MenuItem value="39">39</MenuItem>
                            <MenuItem value="40">40</MenuItem>
                            <MenuItem value="41">41</MenuItem>
                        </Select>
                        {errors.tamanho && <Typography variant="body2">{errors.tamanho}</Typography>}
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.genero}>
                        <InputLabel>Gênero</InputLabel>
                        <Select
                            label="Gênero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                        >
                            <MenuItem value="Masculino">Masculino</MenuItem>
                            <MenuItem value="Feminino">Feminino</MenuItem>
                        </Select>
                        {errors.genero && <Typography variant="body2">{errors.genero}</Typography>}
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.lote}>
                        <InputLabel>Lote</InputLabel>
                        <Select
                            label="Lote"
                            name="lote"
                            value={formData.lote}
                            onChange={handleChange}
                        >
                            {lotes.length > 0 ? (
                                lotes.map((lote) => (
                                    <MenuItem key={lote.num_lote} value={lote}>
                                        {lote.num_lote}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="">Nenhum lote disponível</MenuItem>
                            )}
                        </Select>
                        {errors.lote && <Typography variant="body2">{errors.lote}</Typography>}
                    </FormControl>

                    <input
                        type="file"
                        name="imagem"
                        accept="image/*"
                        onChange={handleChange}
                    />

                    {errors.imagem && <Typography variant="body2" color="error">{errors.imagem}</Typography>}

                    <Button variant="contained" color="secondary" sx={{background:"#1b4d93"}} fullWidth onClick={handleSubmit}>
                        Cadastrar Produto
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CadastroNovosProdutos;
