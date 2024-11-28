import React, { createContext, useState } from 'react';

export const CarrinhotContext = createContext();

export const CartProvider = ({ children }) => {
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);

    const addToCart = (produto) => {
        setProdutosCarrinho((prev) => {
            const existingProduct = prev.find(item => item.id_prod === produto.id_prod);
            if (existingProduct) {
                // Se o produto já estiver no carrinho, aumente a quantidade
                return prev.map(item =>
                    item.id_prod === produto.id_prod
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            } else {
                // Se não estiver no carrinho, adicione o produto com quantidade 1
                return [...prev, { ...produto, quantidade: 1 }];
            }
        });
    };
    const updateQuantity = (produtoId, newQuantity) => {
        setProdutosCarrinho((prevProdutos) => {
            return prevProdutos.map((produto) =>
                produto.id_prod === produtoId
                    ? { ...produto, quantidade: newQuantity }
                    : produto
            );
        });
    };


    const removeFromCart = (id_prod) => {
        setProdutosCarrinho((prev) => {
            const updatedCarrinho = prev.map(item =>
                item.id_prod === id_prod ? { ...item, quantidade: 0 } : item
            ).filter(item => item.quantidade > 0); // Remove os itens com quantidade 0
            return updatedCarrinho;
        });
    };


    return (
        <CarrinhotContext.Provider value={{ produtosCarrinho, addToCart, removeFromCart }}>
            {children}
        </CarrinhotContext.Provider>
    );
};
