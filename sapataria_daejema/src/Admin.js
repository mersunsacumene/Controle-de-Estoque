import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import DrawerAdmin from "./DrawerAdmin";

ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, PointElement);

function Admin() {
    const [vendasAnuais, setVendasAnuais] = useState([]);
    const [vendasMensais, setVendasMensais] = useState({});
    const [mesSelecionado, setMesSelecionado] = useState('Jan');
    const [dadosGrafico, setDadosGrafico] = useState([]);
    const [movimentacoes, setMovimentacoes] = useState([]); // Para armazenar as movimentações

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await fetch('http://localhost:5000/pedido/pedidos');
                const pedidos = await response.json();
                console.log("Pedidos: ", pedidos);

                // Processar os dados para o gráfico anual
                const vendasAnuais = processarVendasAnuais(pedidos);
                console.log("Vendas Anuais:", vendasAnuais);
                setVendasAnuais(vendasAnuais);

                // Processar os dados para o gráfico mensal
                const vendasMensais = processarVendasMensais(pedidos);
                setVendasMensais(vendasMensais);

                setDadosGrafico(vendasMensais[mesSelecionado] || []);
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
            }
        };

        // Buscar movimentações
        const fetchMovimentacoes = async () => {
            try {
                const response = await fetch('http://localhost:5000/movimentacao/movimentacoes'); // Alterar para o endpoint correto
                const movimentacoes = await response.json();
                console.log("Movimentações: ", movimentacoes);
                setMovimentacoes(movimentacoes);
            } catch (error) {
                console.error('Erro ao buscar movimentações:', error);
            }
        };

        fetchPedidos();
        fetchMovimentacoes();
    }, [mesSelecionado]);

    const processarVendasAnuais = (pedidos) => {
        const vendas = {};
        pedidos.forEach((pedido) => {
            const ano = new Date(pedido.createdAt).getFullYear();
            if (!vendas[ano]) vendas[ano] = 0;
            vendas[ano] += 1;
        });

        return Object.entries(vendas).map(([ano, valor]) => ({
            ano,
            quantidade: valor,
        }));
    };

    const processarVendasMensais = (pedidos) => {
        const vendas = {};
        pedidos.forEach((pedido) => {
            const dataPedido = new Date(pedido.createdAt);
            const mes = dataPedido.toLocaleString('default', { month: 'short' });
            const valor = pedido.valor_tot;

            if (!vendas[mes]) vendas[mes] = [];
            vendas[mes].push(valor);
        });

        const vendasMensais = Object.keys(vendas).reduce((acc, mes) => {
            acc[mes] = vendas[mes].reduce((sum, valor) => sum + valor, 0);
            return acc;
        }, {});

        return vendasMensais;
    };

    const handleChangeMes = (event) => {
        const mes = event.target.value;
        setMesSelecionado(mes);
        setDadosGrafico(vendasMensais[mes] || []);
    };

    const dataAnual = {
        labels: vendasAnuais.map(item => item.ano),
        datasets: [
            {
                label: 'Quantidade de Vendas Anuais',
                data: vendasAnuais.map(item => item.quantidade),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
                borderWidth: 2,
            },
        ],
    };

    const optionsAnual = {
        responsive: true,
        scales: {
            y: { beginAtZero: true },
        },
    };

    const dataMensal = {
        labels: Object.keys(vendasMensais),
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

    const optionsMensal = {
        responsive: true,
        scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
        },
    };

    return (
        <Box sx={{ marginLeft: '90px', padding: '20px', margin: 'auto' }}>
            <DrawerAdmin>
                <div id="graficoMensal">
                    <Typography variant="h2" gutterBottom sx={{ marginTop: 5 }}>
                        Gráfico de Vendas Mensais
                    </Typography>

                    <FormControl fullWidth sx={{ marginBottom: 3 }}>
                        <InputLabel id="select-month-label">Escolha um Mês</InputLabel>
                        <Select
                            labelId="select-month-label"
                            value={mesSelecionado}
                            onChange={handleChangeMes}
                            label="Escolha um Mês"
                        >
                            {Object.keys(vendasMensais).map((mes, index) => (
                                <MenuItem key={index} value={mes}>
                                    {mes}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Bar data={dataMensal} options={optionsMensal} />

                    <div id="graficoAnual">
                        <Typography variant="h2" gutterBottom>
                            Gráfico de Vendas Anuais
                        </Typography>
                        <Line data={dataAnual} options={optionsAnual} />
                    </div>

                    {/* Tabela de Movimentações */}
                    <div id="tabelaMovimentacoes" style={{ marginTop: '40px' }}>
                        <Typography variant="h2" gutterBottom>
                            Tabela de Movimentações
                        </Typography>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="tabela movimentações">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tipo de Movimento</TableCell>
                                        <TableCell>ID Estoque</TableCell>
                                        <TableCell>ID Movimentação</TableCell>
                                        <TableCell>Data da Movimentação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {movimentacoes.map((movimentacao, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{movimentacao.tipo_movimento}</TableCell>
                                            <TableCell>{movimentacao.id_estoque}</TableCell>
                                            <TableCell>{movimentacao.id_movimentacao}</TableCell>
                                            <TableCell>{new Date(movimentacao.createdAt).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </DrawerAdmin>
        </Box>
    );
}

export default Admin;
