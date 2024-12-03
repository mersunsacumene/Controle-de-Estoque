import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';

function AnalisePromocoes() {
    const [promocoes, setPromocoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromocoes = async () => {
            try {
                const response = await fetch('http://localhost:5000/promocao/promocoes');
                const data = await response.json();
                console.log("Dados recebidos:", data);
                setPromocoes(data.promocoesComItens); // Acessando promocoesComItens
            } catch (error) {
                console.error("Erro ao buscar promoções:", error);
                setPromocoes([]); // Garante que seja um array mesmo em caso de erro
            } finally {
                setLoading(false);
            }
        };
        fetchPromocoes();
    }, []);

    const desativarPromocao = async (idPromo) => {
        try {
            // Requisição DELETE para desativar a promoção
            const response = await fetch(`http://localhost:5000/promocao/desativar/${idPromo}`, {
                method: 'DELETE',
            });

            // Se a requisição for bem-sucedida, atualizamos a tabela
            if (response.ok) {
                setPromocoes((prevPromocoes) =>
                    prevPromocoes.map((promocaoItem) =>
                        promocaoItem.promocao.id_promo === idPromo
                            ? { ...promocaoItem, promocao: { ...promocaoItem.promocao, ativo: false } }
                            : promocaoItem
                    )
                );
            } else {
                console.error("Falha ao desativar a promoção");
            }
        } catch (error) {
            console.error("Erro ao desativar promoção:", error);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome do Produto</TableCell>
                        <TableCell>Desconto</TableCell>
                        <TableCell>Data de Fim</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(promocoes) && promocoes.map((promocaoItem) => (
                        <TableRow key={promocaoItem.promocao.id_promo}>
                            <TableCell>{promocaoItem.promocao.id_prod}</TableCell>
                            <TableCell>{promocaoItem.produto.nome_prod || "Produto não encontrado"}</TableCell>
                            <TableCell>{promocaoItem.promocao.valor}</TableCell>
                            <TableCell>{new Date(promocaoItem.promocao.data_fim).toLocaleDateString()}</TableCell>
                            <TableCell>{promocaoItem.promocao.ativo ? "Ativa" : "Desativada"}</TableCell>
                            <TableCell>
                                {promocaoItem.promocao.ativo ? (
                                    <Button onClick={() => desativarPromocao(promocaoItem.promocao.id_promo)} variant="contained" color="secondary">
                                        Desativar
                                    </Button>
                                ) : (
                                    <Button disabled variant="contained" color="default">
                                        Desativada
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AnalisePromocoes;
