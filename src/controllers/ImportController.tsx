import { useState } from "react";
import { axiosInstance } from "../services/axios";
import { toast } from "../hooks/use-toast"; 
import { useNavigate } from "react-router-dom"; 

interface PickFile {
  id: string;
  value: string;
  api: string;
}

const pickFiles: PickFile[] = [
  { id: "1", value: "Sales", api: "/api/Sales/upload/sales" },
  { id: "2", value: "Demand", api: "/api/Demand/upload/demand" },
];

export const ImportController = () => {
  const [selectedFile, setSelectedFile] = useState<PickFile | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate(); 

  // const handlePickFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedId = parseInt(event.target.value, 10);
  //   const selectedOption = pickFiles.find((option) => option.id === selectedId.toString());
  //   if (selectedOption) {
  //     setSelectedFile(selectedOption);
  //     document.getElementById("fileInput")?.click();
  //   }
  // };
  const handlePickFileChange = async (value: string) => {
    const selected = pickFiles.find((pickFile) => pickFile.id === value) || null;
    setSelectedFile(selected);
    
    // Trigger file selection
    if (selected) {
      const fileInput = document.getElementById("fileInput") as HTMLInputElement;
      if (fileInput) {
        fileInput.click(); // Simulate a click on the hidden file input
      }
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
      await axiosInstance.post(selectedFile.api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // success toast
      toast({
        description: "File uploaded successfully!",
      });

      if(selectedFile.value === "Sales") {
        setTimeout(() => {
          navigate("/sales-forecast");
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/products-forecast");
        }, 2000);
      }
      
      
      // console.log("Upload successful:", response.data);
    } catch (error) {
      // console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
      setFile(null);
      setSelectedFile(null);
    }
  };

  return {
    pickFiles,
    file,
    isUploading,
    handlePickFileChange,
    handleFileChange,
    handleUpload,
  };
};
