const mockDatabase = {
    usuarios: [],
    funcionarios: [],
};

export const mockCadastroUsuario = (usuario) => {
    const { email } = usuario;
    if (mockDatabase.usuarios.some((u) => u.email === email)) {
        return { success: false, message: "Usuário já cadastrado." };
    }
    mockDatabase.usuarios.push({ ...usuario, role: "usuario" });
    return { success: true, message: "Usuário cadastrado com sucesso." };
};

export const mockCadastroFuncionario = (dadosFuncionario) => {
    const { nome, cpf, telefone, email, senha } = dadosFuncionario;

    // Exemplo simples de validação (em um cenário real, seria uma chamada de API)
    if (nome && cpf && telefone && email && senha) {
        // Retornando um objeto simulando sucesso
        return { success: true, message: "Cadastro realizado com sucesso!" };
    } else {
        // Caso algum dado falte
        return { success: false, message: "Todos os campos são obrigatórios!" };
    }
};

export const mockLogin = ({ email, password }) => {
    const usuario = mockDatabase.usuarios.find((u) => u.email === email && u.password === password);
    const funcionario = mockDatabase.funcionarios.find((f) => f.email === email && f.password === password);

    if (usuario) {
        return { success: true, role: "usuario", message: "Login bem-sucedido como usuário." };
    }
    if (funcionario) {
        return { success: true, role: "funcionario", message: "Login bem-sucedido como funcionário." };
    }
    return { success: false, message: "Credenciais inválidas." };
};
