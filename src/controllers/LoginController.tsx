// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../services/axios"; 

// interface LoginResponse {
//   token: string; 
// }

// export function useLogin() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const login = async (email: string, password: string) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axiosInstance.post<LoginResponse>("/login", {
//         email,
//         password,
//       });

     
//       if (response.status === 200) {
//         localStorage.setItem("authToken", response.data.token);
//         navigate("/import"); 
//       } else {
//         throw new Error("Login failed. Please check your credentials.");
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.message || err.message || "An unknown error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { login, loading, error };
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axios"; 

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username: string;
}

export function LoginController() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

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
    setErrorMessage(null);
  
    try {
      const response = await axiosInstance.post<LoginResponse>("/login", {
        email: formData.email,
        password: formData.password,
      });
  
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        console.log(response.data.username);
        localStorage.setItem("username", response.data.username);
        navigate("/import");
      } else {
        throw new Error("Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.error || err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, errorMessage };
}
