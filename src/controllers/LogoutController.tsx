import useAuth from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const LogoutController = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    localStorage.removeItem("username");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("email");
    navigate("/"); 
  };

  return { handleLogout }; 
};

export default LogoutController;
