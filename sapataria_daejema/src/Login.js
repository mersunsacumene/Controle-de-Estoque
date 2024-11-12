import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  createTheme,
  ThemeProvider,
  Grid,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fffff",
    },
    secondary: {
      main: "#02FF39",
    },
  },
});

function Login() {
  useEffect(() => {
    document.body.style.backgroundImage = "url('favicon2.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundBlendMode = "overlay";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "80vh",
          marginTop: "6%" }}
      >
        <Grid item xs={12} sm={8} md={4}>
          <Paper
            elevation={3}
            style={{ padding: "20px"}}
          >
            <Typography
              variant="h1"
              component="h1"
              align="center"
              gutterBottom
              color="secondary"
            >
              Login
            </Typography>

            <form>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                color="secondary"
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                color="secondary"
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
            </form>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
