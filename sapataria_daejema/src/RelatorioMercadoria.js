import React, { useEffect, useState } from 'react';
import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const RelatorioMercadoria = () => {
    const [relatorioVendas, setRelatorioVendas] = useState({
        vendas: [],
        produtos: [],
        estoques: []
    });

    useEffect(() => {
        // Aqui você deve pegar os dados do seu servidor ou API
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/pedido/relatorio');
            const data = await response.json();
            setRelatorioVendas(data);
        };

        fetchData();
    }, []);

    // Ordena as vendas pela quantidade vendida, do maior para o menor
    const vendasOrdenadas = relatorioVendas.vendas.sort((a, b) => b.quantidade - a.quantidade);

    return (
        <Box sx={{ width: '80%', margin: '20px auto' }}>
            <Typography variant="h1" gutterBottom align="center">
                Relatório de Vendas
            </Typography>

            {/* Tabela de Vendas */}
            <TableContainer component={Paper} sx={{ backgroundColor: '#1b4d93', borderRadius: 2, border: '2px solid black' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', border: '2px solid black' }}>Venda ID</TableCell>
                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', border: '2px solid black' }}>Produto</TableCell>
                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', border: '2px solid black' }}>Preço Unitário</TableCell>
                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', border: '2px solid black' }}>Quantidade Vendida</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendasOrdenadas.map((venda, index) => {
                            // Encontre o estoque relacionado à venda
                            const estoque = relatorioVendas.estoques.find(e => e.id_estoque === venda.id_estoque);

                            if (estoque) {
                                // Agora encontre o produto relacionado ao estoque
                                const produto = relatorioVendas.produtos.find(p => p.id_prod === estoque.id_prod);

                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center" sx={{ color: 'white', border: '2px solid black' }}>{venda.id_ped}</TableCell>
                                        <TableCell align="center" sx={{ color: 'white', border: '2px solid black' }}>
                                            {produto ? produto.nome_prod : "Produto não encontrado"}
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white', border: '2px solid black' }}>
                                            {produto ? `R$${produto.preco_unit}` : "N/A"}
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white', border: '2px solid black' }}>{venda.quantidade}</TableCell>
                                    </TableRow>
                                );
                            }
                            return null; // Se não encontrar o estoque correspondente
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RelatorioMercadoria;
