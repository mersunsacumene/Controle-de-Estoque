import React, { createContext, useState } from 'react';

export const CarrinhotContext = createContext();

export const CartProvider = ({ children }) => {
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);

    const addToCart = (produto) => {
        console.log("Antes de adicionar:", produtosCarrinho); // Estado atual
        setProdutosCarrinho((prev) => [...prev, produto]);
        console.log("Depois de adicionar:", [...produtosCarrinho, produto]);
    };

    const removeFromCart = (id_prod) => {
        setProdutosCarrinho((prev) => prev.filter((produto) => produto.id_prod !== id_prod));
    };

    return (
        <CarrinhotContext.Provider value={{ produtosCarrinho, addToCart, removeFromCart }}>
            {children}
        </CarrinhotContext.Provider>
    );
};
