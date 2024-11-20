import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Produtos from './Produtos';
import Cadastro from './Cadastro';
import Login from './Login';
import CadastroFuncionario from "./CadastroFuncionario";
import EsqueciSenha from "./EsqueciSenha";
import Adming from "./Admin";
import Funcionario from "./Funcionario";
import Carrinho from "./Carrinho";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/esquecisenha" element={<EsqueciSenha />} />
        <Route path="/cadastroFuncionario" element={<CadastroFuncionario />} />
          <Route path="/funcionario" element={<Funcionario />} />
          <Route path="/adming" element={<Adming />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
