import React, { useState } from "react";
import {TextField, Button, Typography, Paper, ThemeProvider, Grid, InputAdornment, IconButton} from "@mui/material";
import { mockLogin } from "./static/MockService";
import { theme } from "./static/Utils";
import {useBackground} from "./static/UseBackGround";
import {Visibility, VisibilityOff} from "@mui/icons-material";

function Login() {
  useBackground('favicon2.png');
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    if (!formValues.password) {
      errors.password = "Senha é obrigatória";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = mockLogin(formValues.email, formValues.password);

      if (result.success) {
        setLoginMessage("Login realizado com sucesso!");
        setFormErrors({});
      } else {
        setLoginMessage(result.message || "Falha ao realizar login");
      }
    }
  };
  return (
      <ThemeProvider theme={theme}>
        <Grid
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
          <Grid item xs={12} sm={8} md={4}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography
                  variant="h1"
                  component="h1"
                  align="center"
                  gutterBottom
                  color="secondary"
              >
                Login
              </Typography>

              {loginMessage && (
                  <Typography
                      align="center"
                      style={{
                        color: loginMessage.startsWith("Login realizado")
                            ? "green"
                            : "red",
                        marginBottom: "16px",
                      }}
                  >
                    {loginMessage}
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
                <TextField
                    label="Password:"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    color="secondary"
                    margin="normal"
                    value={formValues.password}
                    onChange={handleChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    InputProps={{
                      endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                      ),
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{ marginTop: "20px" }}
                >
                  Login
                </Button>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  <a href="/esqueciSenha" style={{ textDecoration: "none", color: "#3f51b5" }}>
                    Esqueci minha senha
                  </a>
                </Typography>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
  );
}

export default Login;
