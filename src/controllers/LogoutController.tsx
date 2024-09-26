import { useNavigate } from 'react-router-dom';

const LogoutController = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/"); 
  };

  return { handleLogout }; 
};

export default LogoutController;
