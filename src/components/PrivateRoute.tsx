
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/use-auth'; 

interface PrivateRouteProps {
  children: React.ReactElement; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth(); 


  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


return <>{children}</>;
};

export default PrivateRoute;
