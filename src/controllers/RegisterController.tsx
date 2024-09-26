import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axios";

interface RegisterResponse {
  message: string;
}

export function RegisterController() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    phoneNumber: "",  
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); 

    try {
      console.log("Sending payload:", formData); 

      const response = await axiosInstance.post<RegisterResponse>("/signup", {
        email: formData.email,
        name: formData.name,
        username: formData.username,
        phoneNumber: formData.phoneNumber,  
        password: formData.password,
      });

      if (response.status === 200) {
        console.log(response.data.message); // success message from backend
        navigate("/login"); // redirect after successful registration
      } else {
        throw new Error("Registration failed.");
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.error || err.message || "An unknown error occurred.");
      console.error("Error response:", err.response?.data);
    }
  };

  return { formData, handleChange, handleSubmit, errorMessage };
}
