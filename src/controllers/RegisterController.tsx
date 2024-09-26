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
    phoneNumber: "",  // Correct field name here
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Reset the error

    try {
      console.log("Sending payload:", formData); // Log the payload for debugging

      const response = await axiosInstance.post<RegisterResponse>("/signup", {
        email: formData.email,
        name: formData.name,
        username: formData.username,
        phoneNumber: formData.phoneNumber,  // Correct field name here
        password: formData.password,
      });

      if (response.status === 200) {
        console.log(response.data.message); // Success message from backend
        navigate("/login"); // Redirect after successful registration
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
