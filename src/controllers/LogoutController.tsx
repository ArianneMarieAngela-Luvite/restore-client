import { useNavigate } from 'react-router-dom';

const LogoutController = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("sessionId");
    navigate("/"); 
  };

  return { handleLogout }; 
};

export default LogoutController;
