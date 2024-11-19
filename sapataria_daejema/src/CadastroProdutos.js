import React from "react";
import { TextField, Button, Typography, Paper, ThemeProvider, Grid2 } from "@mui/material";
import { theme } from "./static/Utils";
import {useBackground} from "./static/UseBackGround";

function CadastroProdutos() {
    useBackground('favicon2.png');
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

export default CadastroProdutos;
