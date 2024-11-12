import React from 'react';
import Grid from '@mui/material/Grid2'
import {Button, Card, CardContent, createTheme, ThemeProvider, Typography} from "@mui/material";
import one from './static/image 1.png';

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

function Produtos(){
    return (
        <ThemeProvider theme={theme}>
        <Grid container spacing={1} >
            <Grid width={"max-content"}
                  xs={12} md={3}>
                <Card
                    sx={{ marginTop: '120px',
                    border: "2px solid #02FF39",
                    borderRadius: "24px"}}>
                    <CardContent style={{  justifyItems:"center" }}>
                        <Typography component="img" src={one} alt="To Vivendo" />
                        <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                        <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                        <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid width={"max-content"}
                  xs={12} md={3}>
                <Card
                    sx={{ marginTop: '120px',
                        border: "2px solid #02FF39",
                        borderRadius: "24px"}}>
                    <CardContent style={{  justifyItems:"center" }}>
                        <Typography component="img" src={one} alt="To Vivendo" />
                        <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                        <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                        <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid width={"max-content"}
                  xs={12} md={3}>
                <Card
                    sx={{ marginTop: '120px',
                        border: "2px solid #02FF39",
                        borderRadius: "24px"}}>
                    <CardContent style={{  justifyItems:"center" }}>
                        <Typography component="img" src={one} alt="To Vivendo" />
                        <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                        <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                        <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid width={"max-content"}
                  xs={12} md={3}>
                <Card
                    sx={{ marginTop: '120px',
                        border: "2px solid #02FF39",
                        borderRadius: "24px"}}>
                    <CardContent style={{  justifyItems:"center" }}>
                        <Typography component="img" src={one} alt="To Vivendo" />
                        <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                        <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                        <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                    </CardContent>
                </Card>
                <Grid width={"max-content"}
                      xs={12} md={3}>
                    <Card
                        sx={{ marginTop: '120px',
                            border: "2px solid #02FF39",
                            borderRadius: "24px"}}>
                        <CardContent style={{  justifyItems:"center" }}>
                            <Typography component="img" src={one} alt="To Vivendo" />
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                            <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid width={"max-content"}
                      xs={12} md={3}>
                    <Card
                        sx={{ marginTop: '120px',
                            border: "2px solid #02FF39",
                            borderRadius: "24px"}}>
                        <CardContent style={{  justifyItems:"center" }}>
                            <Typography component="img" src={one} alt="To Vivendo" />
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                            <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid width={"max-content"}
                      xs={12} md={3}>
                    <Card
                        sx={{ marginTop: '120px',
                            border: "2px solid #02FF39",
                            borderRadius: "24px"}}>
                        <CardContent style={{  justifyItems:"center" }}>
                            <Typography component="img" src={one} alt="To Vivendo" />
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                            <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid width={"max-content"}
                      xs={12} md={3}>
                    <Card
                        sx={{ marginTop: '120px',
                            border: "2px solid #02FF39",
                            borderRadius: "24px"}}>
                        <CardContent style={{  justifyItems:"center" }}>
                            <Typography component="img" src={one} alt="To Vivendo" />
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                            <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid width={"max-content"}
                      xs={12} md={3}>
                    <Card
                        sx={{ marginTop: '120px',
                            border: "2px solid #02FF39",
                            borderRadius: "24px"}}>
                        <CardContent style={{  justifyItems:"center" }}>
                            <Typography component="img" src={one} alt="To Vivendo" />
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                            <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid width={"max-content"}
                      xs={12} md={3}>
                    <Card
                        sx={{ marginTop: '120px',
                            border: "2px solid #02FF39",
                            borderRadius: "24px"}}>
                        <CardContent style={{  justifyItems:"center" }}>
                            <Typography component="img" src={one} alt="To Vivendo" />
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                            <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid width={"max-content"}
                      xs={12} md={3}>
                    <Card
                        sx={{ marginTop: '120px',
                            border: "2px solid #02FF39",
                            borderRadius: "24px"}}>
                        <CardContent style={{  justifyItems:"center" }}>
                            <Typography component="img" src={one} alt="To Vivendo" />
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                            <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid width={"max-content"}
                      xs={12} md={3}>
                    <Card
                        sx={{ marginTop: '120px',
                            border: "2px solid #02FF39",
                            borderRadius: "24px"}}>
                        <CardContent style={{  justifyItems:"center" }}>
                            <Typography component="img" src={one} alt="To Vivendo" />
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Sandália de Moisés</Typography>
                            <Typography variant="h5" style={{fontWeight: "bold"}}>Valor: 29,99</Typography>
                            <Button style={{background:"#FF8000", color:"black", border:"2px solid black ", borderRadius:"99px"}}>Comprar</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
        </ThemeProvider>
    )
}

export default Produtos;