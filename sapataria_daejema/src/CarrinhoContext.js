import React, { createContext, useState } from 'react';

export const CarrinhotContext = createContext();

export const CartProvider = ({ children }) => {
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);

    const addToCart = (produto) => {
        // Verifica se o produto já existe no carrinho com base no id_prod
        const produtoExistente = produtosCarrinho.find((item) => item.produto.id_prod === produto.produto.id_prod);

        if (produtoExistente) {
            console.log("Produto já está no carrinho:", produto.produto.id_prod);
            return; // Não adiciona o produto se ele já estiver no carrinho
        }

        console.log("Antes de adicionar:", produtosCarrinho); // Estado atual
        setProdutosCarrinho((prev) => [...prev, produto]);
        console.log("Depois de adicionar:", [...produtosCarrinho, produto]);
    };
    const clearCart = () => {
        setProdutosCarrinho([]);
    };
    const removeFromCart = (id_prod) => {
        setProdutosCarrinho((prev) => prev.filter((produto) => produto.produto.id_prod !== id_prod));
    };
    const updateProductQuantity = (produtoId, newQuantity) => {
        setProdutosCarrinho((prev) =>
            prev.map((produto) =>
                produto.produto.id_prod === produtoId
                    ? { ...produto, quantidade: newQuantity }
                    : produto
            )
        );
    };

    return (
        <CarrinhotContext.Provider value={{ produtosCarrinho, addToCart, removeFromCart,updateProductQuantity,clearCart }}>
            {children}
        </CarrinhotContext.Provider>
    );
};
