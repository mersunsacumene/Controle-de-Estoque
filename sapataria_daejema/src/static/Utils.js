import {createTheme} from "@mui/material";

export const formatCPF = (cpf) => cpf.replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

export const formatPhone = (telefone) => telefone.replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2');

export const isValidCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calcDigit = (factor) => {
        let sum = 0;
        for (let i = 0; i < cpf.length - (12 - factor); i++) {
            sum += parseInt(cpf.charAt(i)) * (factor - i);
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const digit1 = calcDigit(10);
    const digit2 = calcDigit(11);

    return digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10));
};

export const isValidPhone = (telefone) => {
    telefone = telefone.replace(/\D/g, '');
    return telefone.length === 10 || telefone.length === 11;
};
export const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
        },
        secondary: {
            main: '#02FF39',
        },
    },
});

