import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Produtos from './Produtos';
import Cadastro from './Cadastro';
import Login from './Login';
import CadastroFuncionario from "./CadastroFuncionario";
import EsqueciSenha from "./EsqueciSenha";
import Funcionario from "./Funcionario";
import Carrinho from "./Carrinho";
import CadastroNovosProdutos from "./CadastroNovosProdutos";
import CadastroLote from "./CadastroLote";
import CadastroFornecedor from "./CadastroFornecedor";
import Admin from "./Admin";
import AdicionarMercadoria from "./AdicionarMercadoria";
import {CartProvider} from "./CarrinhoContext";
import RelatorioMercadoria from "./RelatorioMercadoria";
import AdicionarPromocao from "./adicionarPromocao";

function App() {
  return (
      <CartProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/esquecisenha" element={<EsqueciSenha />} />
        <Route path="/cadastroFuncionario" element={<CadastroFuncionario />} />
          <Route path="/cadastroFornecedor" element={<CadastroFornecedor />} />
        <Route path="/relatorioMercadoria" element={<RelatorioMercadoria />} />
          <Route path="/cadastroLote" element={<CadastroLote />} />
        <Route path="/adicionarMercadoria" element={<AdicionarMercadoria />} />
        <Route path="/adicionarPromocao" element={<AdicionarPromocao />} />
          <Route path="/cadastroNovosProdutos" element={<CadastroNovosProdutos />} />
          <Route path="/funcionario" element={<Funcionario />} />
          <Route path="/adming" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
      </CartProvider>
  );
}

export default App;
