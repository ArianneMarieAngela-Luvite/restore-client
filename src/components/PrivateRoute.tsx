// import { Outlet, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider';

// const PrivateRoute = () => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <Outlet /> :<Navigate to="/login" replace />;
// };

// export default PrivateRoute;

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;