import { useState, useEffect } from "react";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken"); 
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem("authToken", token); 
        console.log("Token stored:", token); 
        setIsAuthenticated(true);
        // window.location.reload();
    };

    const logout = () => {
        localStorage.removeItem("authToken"); 
    };

    return { isAuthenticated, login, logout };
};

export default useAuth;
