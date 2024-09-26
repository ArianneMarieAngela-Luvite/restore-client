// import { useState } from "react";
// import { axiosInstance } from "../services/axios";

// interface PickFile {
//   id: number;
//   value: string;
//   api: string;
// }

// const pickFiles: PickFile[] = [
//   { id: 1, value: "Sales", api: "api/Sales/upload/sales" },
//   { id: 2, value: "Demand", api: "api/Demand/upload/demand" },
// ];

// export const ImportController = () => {
//   const [selectedFile, setSelectedFile] = useState<PickFile | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const handlePickFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = parseInt(event.target.value, 10);
//     const selectedOption = pickFiles.find((option) => option.id === selectedId);
//     if (selectedOption) {
//       setSelectedFile(selectedOption);
//       document.getElementById("fileInput")?.click();
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || !selectedFile) return;

//     setIsUploading(true);
//     const username = localStorage.getItem("username") || "";

//     const formData = new FormData();
//     formData.append("username", username);
//     formData.append("file", file);

//     try {
//       const response = await axiosInstance.post(selectedFile.api, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Upload successful:", response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setIsUploading(false);
//       setFile(null);
//       setSelectedFile(null);
//     }
//   };

//   return {
//     pickFiles,
//     selectedFile,
//     file,
//     isUploading,
//     handlePickFileChange,
//     handleFileChange,
//     handleUpload,
//   };
// };


import { useState } from "react";
import { axiosInstance } from "../services/axios";
import { toast } from "../hooks/use-toast"; // Import the toast function
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface PickFile {
  id: number;
  value: string;
  api: string;
}

const pickFiles: PickFile[] = [
  { id: 1, value: "Sales", api: "api/Sales/upload/sales" },
  { id: 2, value: "Demand", api: "api/Demand/upload/demand" },
];

export const ImportController = () => {
  const [selectedFile, setSelectedFile] = useState<PickFile | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handlePickFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedOption = pickFiles.find((option) => option.id === selectedId);
    if (selectedOption) {
      setSelectedFile(selectedOption);
      document.getElementById("fileInput")?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedFile) return;

    setIsUploading(true);
    const username = localStorage.getItem("username") || "";

    const formData = new FormData();
    formData.append("username", username);
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(selectedFile.api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // success toast
      toast({
        description: "File uploaded successfully!",
      });

      setTimeout(() => {
        navigate("/sales-forecast");
      }, 2000);
      
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
      setFile(null);
      setSelectedFile(null);
    }
  };

  return {
    pickFiles,
    selectedFile,
    file,
    isUploading,
    handlePickFileChange,
    handleFileChange,
    handleUpload,
  };
};
