export const checkAuthentication = () => {
    return !!localStorage.getItem('authToken'); // Retorna true se o token existir
};
