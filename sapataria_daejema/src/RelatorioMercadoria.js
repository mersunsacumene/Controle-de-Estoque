import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import axios from 'axios';

function RelatorioMercadoria() {
    const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
    const [produtosEsgotando, setProdutosEsgotando] = useState([]);

    const fetchProdutosMaisVendidos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/produto/relatorio/mais-vendidos', {
                headers: { "Content-Type": "application/json" }
            });
            setProdutosMaisVendidos(response.data);
        } catch (erro) {
            console.log("Erro ao carregar os produtos mais vendidos: ", erro);
        }
    };

    const fetchProdutosEsgotando = async () => {
        try {
            const response = await axios.get('http://localhost:5000/produto/relatorio/esgotando', {
                headers: { "Content-Type": "application/json" }
            });
            setProdutosEsgotando(response.data);
        } catch (erro) {
            console.log("Erro ao carregar os produtos esgotando: ", erro);
        }
    };

    useEffect(() => {
        fetchProdutosMaisVendidos();
        fetchProdutosEsgotando();
    }, []);

    return (
        <Box sx={{ width: '80%', margin: '20px auto' }}>
            <Typography variant="h1" gutterBottom align="center">
                Relatórios de Mercadorias
            </Typography>

            {/* Tabela de Mercadorias Mais Vendidas */}
            <Typography variant="h3" gutterBottom align="center" sx={{ mb: 2 }}>
                Relatório de Mercadoria Mais Vendidos
            </Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: '#1b4d93', borderRadius: 2, border: '2px solid black' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', border: '2px solid black' }}>Nome do Item</TableCell>
                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', border: '2px solid black' }}>Preço Unitário</TableCell>
                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', border: '2px solid black' }}>Quantidade Vendida</TableCell>
                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', border: '2px solid black' }}>Quantidade em Estoque</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {produtosMaisVendidos.map((produto, index) => (
                            <TableRow key={index}>
                                <TableCell align="center" sx={{ color: 'white', border: '2px solid black' }}>{produto.nome_prod}</TableCell>
                                <TableCell align="center" sx={{ color: 'white', border: '2px solid black' }}>R${produto.preco_unit}</TableCell>
                                <TableCell align="center" sx={{ color: 'white', border: '2px solid black'}}>{produto.quantidade_vendida}</TableCell>
                                <TableCell align="center" sx={{ color: 'white', border: '2px solid black' }}>{produto.estoque}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default RelatorioMercadoria;
