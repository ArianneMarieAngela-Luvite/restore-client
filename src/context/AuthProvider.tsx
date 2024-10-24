import React, { createContext, useState } from 'react';

export interface AuthContextProps {
    isAuthenticated: boolean;
    loginUser: () => void;
    logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    

    const loginUser = () => {
        const token = localStorage.getItem("authToken");
        
        if(token) {
            setIsAuthenticated(true);
           
        }
    };

    const logoutUser = () => {
        localStorage.removeItem("authToken"); 
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

