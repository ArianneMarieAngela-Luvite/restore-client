import { useEffect, useState } from "react";
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
  const [credits, setCredits] = useState<number | null>(null);
  const navigate = useNavigate();

  const handlePickFileChange = async (value: string) => {
    const selected = pickFiles.find((pickFile) => pickFile.id === value) || null;
    setSelectedFile(selected);

    if (selected) {
      const fileInput = document.getElementById("fileInput") as HTMLInputElement;
      if (fileInput) {
        fileInput.click();
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
    const username = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";
    
    // Check if the user has enough credits before uploading
    if (credits === null || credits <= 0) {
      toast({
        description: "You do not have enough credits to upload the file.",
      });
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);
    formData.append("email", email);

    try {
      await axiosInstance.post(selectedFile.api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        description: "File uploaded successfully!",
      });

      if (selectedFile.value === "Sales") {
        setTimeout(() => navigate("/sales-forecast"), 2000);
      } else {
        setTimeout(() => navigate("/products-forecast"), 2000);
      }
    } catch (error) {
      toast({
        description: "Failed to upload file.",
      });
    } finally {
      setIsUploading(false);
      setFile(null);
      setSelectedFile(null);
    }
  };
  
  const fetchCustomerCredits = async () => {

    const email = localStorage.getItem("email");
    if (!email) {
      toast({
        description: "Email not found in localStorage.",
      });
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/payment/customer-credits`, {
        params: { email },
      });
      if(response.data.creditsRemaining > 0) {
        setCredits(response.data.creditsRemaining);
      } else
        setCredits(0);
    } catch (error) {
      toast({
        description: "Failed to fetch customer credits.",
      });
    }
  };

  useEffect(() => {
    fetchCustomerCredits();
  }, []); 

  return {
    pickFiles,
    file,
    isUploading,
    credits,
    handlePickFileChange,
    handleFileChange,
    handleUpload,
  };
};