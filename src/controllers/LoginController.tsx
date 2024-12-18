import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axios"; 
import { useLocation } from "react-router-dom"; 

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username: string;
  email: string;
  message: string;
}

export function LoginController() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
  
    try {
      const response = await axiosInstance.post<LoginResponse>("/login", {
        email: formData.email,
        password: formData.password,
      });
  
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        setMessage(response.data.message);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        // navigate("/import");
        // Navigate based on username comparison
        const queryParams = new URLSearchParams(location.search);
        const queryUsername = queryParams.get("username");

        // Compare the logged-in username with the username from query params
        if (queryUsername !== response.data.username) {
          navigate("/import");
        } else {
          navigate("/upload");
        }
      }
    } catch (err: any) {
      if (err.response) {
      }
      setMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, message };
}
