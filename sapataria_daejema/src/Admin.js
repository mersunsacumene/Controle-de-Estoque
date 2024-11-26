import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import DrawerAdmin from "./DrawerAdmin";
import { useBackground } from "./static/UseBackGround";

// Registra os componentes do Chart.js necessários
ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, PointElement);

function Admin() {
    const [vendasAnuais, setVendasAnuais] = useState([
        { mes: 'Jan', valor: 5000 },
        { mes: 'Feb', valor: 4500 },
        { mes: 'Mar', valor: 5600 },
        { mes: 'Apr', valor: 6000 },
        { mes: 'May', valor: 7000 },
        { mes: 'Jun', valor: 7500 },
        { mes: 'Jul', valor: 6900 },
        { mes: 'Aug', valor: 8000 },
        { mes: 'Sep', valor: 8500 },
        { mes: 'Oct', valor: 9200 },
        { mes: 'Nov', valor: 8800 },
        { mes: 'Dec', valor: 9500 },
    ]);

    const vendasDiarias = {
        Jan: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
        Feb: Array.from({ length: 28 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
        Mar: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
        Apr: Array.from({ length: 30 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
        May: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
        Jun: Array.from({ length: 30 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
        Jul: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
        Aug: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
        Sep: Array.from({ length: 30 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
        Oct: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
        Nov: Array.from({ length: 30 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
        Dec: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * 1000) + 100),
    };

    // Estado para o mês selecionado e dados do gráfico mensal
    const [mesSelecionado, setMesSelecionado] = useState('Jan');
    const [dadosGrafico, setDadosGrafico] = useState(vendasDiarias[mesSelecionado]);

    // Função para atualizar o gráfico com base no mês selecionado
    const handleChangeMes = (event) => {
        const mes = event.target.value;
        setMesSelecionado(mes);
        setDadosGrafico(vendasDiarias[mes]);
    };

    // Dados do gráfico anual
    const dataAnual = {
        labels: vendasAnuais.map(item => item.mes),
        datasets: [
            {
                label: 'Vendas Anuais',
                data: vendasAnuais.map(item => item.valor),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
                borderWidth: 2,
            },
        ],
    };

    // Opções do gráfico anual
    const optionsAnual = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Dados do gráfico mensal
    const dataMensal = {
        labels: Array.from({ length: new Date(2024, new Date().getMonth(), 0).getDate() }, (_, i) => i + 1),
        datasets: [
            {
                label: `Vendas de ${mesSelecionado}`,
                data: dadosGrafico,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Opções do gráfico mensal
    const optionsMensal = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Box sx={{ marginLeft: '90px', padding: '20px', margin:'auto' }}>
            <DrawerAdmin>
            <div id="graficoAnual">
                <Typography variant="h1" gutterBottom>
                    Gráfico de Vendas Anuais
                </Typography>
                <Line data={dataAnual} options={optionsAnual} />
            </div>

            <div id="graficoMensal">
                <Typography variant="h1" gutterBottom sx={{ marginTop: 5 }}>
                    Gráfico de Vendas Mensais
                </Typography>

                {/* Select para escolher o mês */}
                <FormControl fullWidth sx={{ marginBottom: 3 }}>
                    <InputLabel id="select-month-label">Escolha um Mês</InputLabel>
                    <Select
                        labelId="select-month-label"
                        value={mesSelecionado}
                        onChange={handleChangeMes}
                        label="Escolha um Mês"
                    >
                        {Object.keys(vendasDiarias).map((mes, index) => (
                            <MenuItem key={index} value={mes}>
                                {mes}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Exibindo o gráfico de barras */}
                <Bar data={dataMensal} options={optionsMensal} />
            </div>
            </DrawerAdmin>
        </Box>
    );
}

export default Admin;
