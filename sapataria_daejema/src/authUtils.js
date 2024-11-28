export const checkAuthentication = () => {
    return !!localStorage.getItem('authToken'); // Retorna true se o token existir
};


// Função para decodificar o token
export function getToken() {
    const token = localStorage.getItem('authToken');
    console.log('Token antes de decodificar:', token);
    if (token) {
        try {
            return token;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return null;
        }
    } else {
        console.log('Token não encontrado.' + token);
        return null;
    }
}
