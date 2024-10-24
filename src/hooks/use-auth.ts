// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthProvider';

// export const useAuth = (): AuthContextProps => {
//     const context = useContext(AuthContext);

//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }

//     return context;
// };

import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider'; // Import the AuthContext from the original file
import { AuthContextProps } from '../context/AuthProvider'; // Import the AuthContextProps interface

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
