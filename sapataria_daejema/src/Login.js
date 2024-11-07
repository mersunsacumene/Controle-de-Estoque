import React, { useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, createTheme, ThemeProvider } from '@mui/material';


const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#c3062c',
      },
    },
  });
 
function Login(){
  useEffect(() => {
    document.body.style.backgroundImage = "url('favicon.ico')";
    document.body.style.backgroundSize = 'cover, cover, cover, cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundBlendMode = 'overlay';
  
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
    <Grid
      container
      bgcolor={"transparent"}
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Paper elevation={3} style={{ padding: '20px', textDecoration: 'bolder'}}>
          <Typography variant="h1" component="h1" align="center" gutterBottom color='secondary'>
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
              style={{ marginTop: '20px' }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  </ThemeProvider>
);
};

export default Login;
