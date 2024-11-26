
export const checkAuthentication = () => {
    const token = localStorage.getItem('authToken');
    return !!token;
};

