
import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './static/Utils';

function DrawerAdmin({ children }){
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    return (
        <ThemeProvider theme={theme}>
            {/* Menu Icon Button to open Drawer */}
            <IconButton
                onClick={() => toggleDrawer(true)}
                style={{
                    position: 'fixed',
                    left: '30px',
                    cursor: 'pointer'
                }}
            >
                <MenuIcon /> <label>Menu</label>
            </IconButton>

            {/* Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 280,
                        height: "100%",
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: '20px',
                        justifyContent: 'space-between',
                        backgroundColor: "solid",
                        color: "black",
                    },
                }}
            >
                <List style={{ margin: "50px 30px", cursor: "pointer", color: "black" }}>
                    <ListItem button onClick={() => navigate("/cadastroFuncionario")}>
                        <ListItemText primary="Cadastrar Funcionario" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Grafico Anual de Vendas" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Grafico Mensal de Vendas" />
                    </ListItem>
                </List>
            </Drawer>

            {/* Main content that will change based on the route */}
            <Box sx={{ marginLeft: '280px', padding: '20px' }}>
                {children}
            </Box>
        </ThemeProvider>
    );
};

export default DrawerAdmin;
