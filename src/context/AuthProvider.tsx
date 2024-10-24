// import React, { createContext, useContext, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// interface AuthContextProps {
//     isAuthenticated: boolean;
//     loginUser: () => void;
//     logoutUser: () => void;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     // const navigate = useNavigate();

//     const loginUser = () => {
//         const token = localStorage.getItem("authtoken");
        
//         if(token) {
//             setIsAuthenticated(true);
//         }
//     }

//     const logoutUser = () => {
//         localStorage.removeItem("authToken");
//         setIsAuthenticated(false);
//     }

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
//             {children}
//         </AuthContext.Provider>
//     );

// };

// export const useAuth = (): AuthContextProps => {
//     const context = useContext(AuthContext);

//     if(!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }

//     return context;
// }


import React, { createContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

export interface AuthContextProps {
    isAuthenticated: boolean;
    loginUser: () => void;
    logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const navigate = useNavigate();

    const loginUser = () => {
        const token = localStorage.getItem("authToken");  // fixed key casing
        
        if(token) {
            setIsAuthenticated(true);
            // navigate("/import");
        }
    };

    const logoutUser = () => {
        localStorage.removeItem("authToken");  // fixed key casing
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Default export for Fast Refresh compatibility
export default AuthProvider;

