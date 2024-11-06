import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

function Cadastro(){
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: '',
      });
    
      const [formErrors, setFormErrors] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: '',
      });
    
      const handleChange = ((e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      });

      const validateForm = () => {
        let errors = {};
        if (!formValues.nome) errors.nome = 'Nome é obrigatório';
        if (!formValues.email) {
          errors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
          errors.email = 'Insira um email válido';
        }
        if (!formValues.senha) {
          errors.senha = 'Senha é obrigatória';
        } else if (formValues.senha.length < 6) {
          errors.senha = 'A senha deve ter pelo menos 6 caracteres';
        }
        if (!formValues.confirmacaoSenha) {
          errors.confirmacaoSenha = 'Confirmação de senha é obrigatória';
        } else if (formValues.senha !== formValues.confirmacaoSenha) {
          errors.confirmacaoSenha = 'As senhas não coincidem';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          alert('Cadastro realizado com sucesso!');
          setFormValues({ nome: '', email: '', senha: '', confirmacaoSenha: '' });
        }
      };
    
      return (
        <Container   maxWidth="sm" sx={{ border: '3px solid #ccc', bgcolor:'#f2f2f2', marginTop:'6%', borderRadius: '12px', padding: '16px',}}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8 }}>
            <Typography variant="h1" gutterBottom textAlign={'center'}>
              Cadastro
            </Typography>
            <TextField
              label="Nome"
              name="nome"
              fullWidth
              margin="normal"
              value={formValues.nome}
              onChange={handleChange}
              error={!!formErrors.nome}
              helperText={formErrors.nome}  
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formValues.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              label="Senha"
              name="senha"
              type="password"
              fullWidth
              margin="normal"
              value={formValues.senha}
              onChange={handleChange}
              error={!!formErrors.senha}
              helperText={formErrors.senha}
            />
            <TextField
              label="Confirmação de Senha"
              name="confirmacaoSenha"
              type="password"
              fullWidth
              margin="normal"
              value={formValues.confirmacaoSenha}
              onChange={handleChange}
              error={!!formErrors.confirmacaoSenha}
              helperText={formErrors.confirmacaoSenha}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Cadastrar
            </Button>
          </Box>
        </Container>
      );
   };


export default Cadastro;