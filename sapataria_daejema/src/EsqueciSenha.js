import React, { useState } from "react";
import { TextField, Button, Typography, Paper, ThemeProvider, Grid2 } from "@mui/material";
import { theme } from "./static/Utils";
import { useNavigate } from "react-router-dom";
import {useBackground} from "./static/UseBackGround";
import axios from "axios";

function EsqueciSenha() {
    useBackground('favicon2.png');
    const [formValues, setFormValues] = useState({
        email: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Navegação após sucesso (por exemplo, para login)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validateForm = () => {
        let errors = {};
        if (!formValues.email) {
            errors.email = "Email é obrigatório";
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = "Insira um email válido";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try{
                const response = await axios.post("http://127.0.0.1:5000/usuario/recuperarSenha",{
                    email:formValues.email,
                },{headers: {"Content-Type": "application/json"}});
                console.log(response.data)
                setMessage(response.data.message);
                navigate("/login")
            }catch(error){
                console.log('got error', error.message, error.response)
                const errorMsg = error.response?.data?.error || "Erro desconhecido.";
                setMessage(errorMsg);
            }

        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid2
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{
                    minHeight: "80vh",
                    marginTop: "6%",
                }}
            >
                <Grid2 item xs={12} sm={8} md={4}>
                    <Paper elevation={3} style={{ padding: "20px" }}>
                        <Typography
                            variant="h1"
                            component="h1"
                            align="center"
                            gutterBottom
                            color="secondary"
                        >
                            Recuperar Senha
                        </Typography>

                        {message && (
                            <Typography
                                align="center"
                                style={{
                                    color: message.includes("enviada") ? "green" : "red",
                                    marginBottom: "16px",
                                }}
                            >
                                {message}
                            </Typography>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                color="secondary"
                                value={formValues.email}
                                onChange={handleChange}
                                error={!!formErrors.email}
                                helperText={formErrors.email}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                fullWidth
                                style={{ marginTop: "20px" }}
                            >
                                Enviar Nova Senha
                            </Button>
                        </form>
                    </Paper>
                </Grid2>
            </Grid2>
        </ThemeProvider>
    );
}

export default EsqueciSenha;
