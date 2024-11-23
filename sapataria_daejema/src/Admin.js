import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, TextField } from "@mui/material";
import { Card, CardContent, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "./static/Utils";
import { ThemeProvider } from '@mui/material/styles';
import { useBackground } from "./static/UseBackGround";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

function Admin() {
    useBackground('favicon2.png');
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    return (
        <ThemeProvider theme={theme}>
            <IconButton onClick={() => toggleDrawer(true)} style={{ position: 'fixed', left: '30px', cursor: 'pointer' }}>
                <MenuIcon /> <label>Menu</label>
            </IconButton>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 280,
                        height: "fill",
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
                    <ListItem button onClick= {()=> navigate("/cadastroFuncionario")}>
                        <ListItemText primary="Cadastrar Funcionario" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText primary="Grafico Anual de Vendas" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText primary="Grafico Mensal de Vendas" />
                    </ListItem>
                </List>
            </Drawer>
        </ThemeProvider>
    );
}

export default Admin;
