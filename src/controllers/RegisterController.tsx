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
    verifyPassword: ""
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (formData.password !== formData.verifyPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // console.log("Sending payload:", formData);

      const response = await axiosInstance.post<RegisterResponse>("/signup", {
        email: formData.email,
        name: formData.name,
        username: formData.username,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      if (response.status === 200) {
        // console.log(response.data.message);
        localStorage.setItem("email", formData.email);
        navigate("/email-verification");
      } else {
        throw new Error("Registration failed.");
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.error || err.message || "An unknown error occurred.");
      console.error("Error response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, errorMessage };
}
