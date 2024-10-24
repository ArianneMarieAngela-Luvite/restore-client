import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axios"; 
import { useAuth } from "../context/AuthProvider";

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
  const { loginUser } = useAuth();

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
        // console.log(response.data.username);
        setMessage(response.data.message);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        // console.log(response.data.email);
        loginUser();
        navigate("/import");
      }
    } catch (err: any) {
      if(err.response) {
        // const errMessage = err.response.data?.message || err.response.data.message || "Unknown error";
        // // console.log(errMessage);
      }
      // console.log("Error: ", err.message);
      setMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, message };
}
