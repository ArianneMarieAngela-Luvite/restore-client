// import { useEffect, useState } from "react";
// import { axiosInstance } from "../services/axios";
// import { toast } from "../hooks/use-toast"; 
// import { useNavigate } from "react-router-dom"; 

// interface PickFile {
//   id: string;
//   value: string;
//   api: string;
// }

// const pickFiles: PickFile[] = [
//   { id: "1", value: "Sales", api: "/api/Sales/upload/sales" },
//   { id: "2", value: "Demand", api: "/api/Demand/upload/demand" },
// ];

// export const ImportController = () => {
//   const [selectedFile, setSelectedFile] = useState<PickFile | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [credits, setCredits] = useState<number | null>(null);
//   const navigate = useNavigate(); 

//   const handlePickFileChange = async (value: string) => {
//     const selected = pickFiles.find((pickFile) => pickFile.id === value) || null;
//     setSelectedFile(selected);
    
//     // Trigger file selection
//     if (selected) {
//       const fileInput = document.getElementById("fileInput") as HTMLInputElement;
//       if (fileInput) {
//         fileInput.click(); // Simulate a click on the hidden file input
//       }
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
//     const email = localStorage.getItem("email") || "";
//     // const uname = localStorage.getItem("username");

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("email", email);
    

//     try {
//       await axiosInstance.post(selectedFile.api, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // success toast
//       toast({
//         description: "File uploaded successfully!",
//       });

//       if(selectedFile.value === "Sales") {
//         setTimeout(() => {
//           navigate("/sales-forecast");
//         }, 2000);
//       } else {
//         setTimeout(() => {
//           navigate("/products-forecast");
//         }, 2000);
//       }
      
      
//       // console.log("Upload successful:", response.data);
//     } catch (error) {
//       // console.error("Error uploading file:", error);
//     } finally {
//       setIsUploading(false);
//       setFile(null);
//       setSelectedFile(null);
//     }
//   };

//   const fetchCustomerCredits = async () => {
//     const email = localStorage.getItem("email");
//     if (!email) {
//       console.error("Email not found in localStorage.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(`/api/payment/customer-credits`, {
//         params: { email }, 
//       });
//       setCredits(response.data.creditsRemaining); 

//     } catch (error) {
//       console.error("Error fetching customer credits:", error);
//       toast({
//         description: "Failed to fetch customer credits.",
//       });
//     }
//   };

  
  

//   const handlePaymentWebhook = async () => {
//     const sessionId = localStorage.getItem("sessionID");
//     console.log(sessionId);
//     if (!sessionId) {
//       console.error("Session ID not found in localStorage.");
//       return;
//     }
//     console.log(localStorage.getItem("sessionId"));
//     try {
//       await axiosInstance.post("/api/payment/paymongo-webhook", { sessionId }, {
//         headers: { "Content-Type": "application/json" },
//       });
  
//       toast({ description: "Payment confirmation received. Credits have been updated." });
      
//       // Refresh customer credits after payment
//       fetchCustomerCredits();
      
//     } catch (error) {
//       console.error("Error handling payment webhook:", error);
//       toast({ description: "Failed to process payment confirmation." });
//     }
//   };
  
//   useEffect(() => {
//     fetchCustomerCredits();
//     handlePaymentWebhook(); // Trigger payment status check on load
//   }, []);


//   return {
//     pickFiles,
//     file,
//     isUploading,
//     credits,
//     handlePaymentWebhook,
//     handlePickFileChange,
//     handleFileChange,
//     handleUpload,
//   };
// };


// import { useEffect, useState } from "react";
// import { axiosInstance } from "../services/axios";
// import { toast } from "../hooks/use-toast"; 
// import { useNavigate } from "react-router-dom"; 

// interface PickFile {
//   id: string;
//   value: string;
//   api: string;
// }

// const pickFiles: PickFile[] = [
//   { id: "1", value: "Sales", api: "/api/Sales/upload/sales" },
//   { id: "2", value: "Demand", api: "/api/Demand/upload/demand" },
// ];

// export const ImportController = () => {
//   const [selectedFile, setSelectedFile] = useState<PickFile | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [credits, setCredits] = useState<number | null>(null);
//   const navigate = useNavigate(); 

//   const handlePickFileChange = async (value: string) => {
//     const selected = pickFiles.find((pickFile) => pickFile.id === value) || null;
//     setSelectedFile(selected);
    
//     if (selected) {
//       const fileInput = document.getElementById("fileInput") as HTMLInputElement;
//       if (fileInput) {
//         fileInput.click(); 
//       }
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || !selectedFile) return;
//     const username = localStorage.getItem("username") || "";
//     const email = localStorage.getItem("email") || "";
//     console.log(username, email);

//     // Check if the user has enough credits before uploading
//     if (credits === null || credits <= 0) {
//       toast({
//         description: "You do not have enough credits to upload the file.",
//       });
//       return;
//     }

//     setIsUploading(true);
    

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("username", username);
//     formData.append("email", email);

//     try {
//       await axiosInstance.post(selectedFile.api, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast({
//         description: "File uploaded successfully!",
//       });

//       if (selectedFile.value === "Sales") {
//         setTimeout(() => navigate("/sales-forecast"), 2000);
//       } else {
//         setTimeout(() => navigate("/products-forecast"), 2000);
//       }
//     } catch (error) {
//       toast({
//         description: "Failed to upload file.",
//       });
//     } finally {
//       setIsUploading(false);
//       setFile(null);
//       setSelectedFile(null);
//     }
//   };

//   const handlePaymentWebhook = async () => {
//     const sessionId = localStorage.getItem("sessionID");
//     console.log(sessionId);
//     if (!sessionId) return;

//     try {
//       await axiosInstance.post("/api/payment/paymongo-webhook", { sessionId }, {
//         headers: { "Content-Type": "application/json" },
//       });

//       toast({ description: "Payment confirmation received. Credits have been updated." });
//       fetchCustomerCredits();
//     } catch (error) {
//       toast({ description: "Failed to process payment confirmation." });
//     }
//   };

//   const fetchCustomerCredits = async () => {
//     const email = localStorage.getItem("email");
//     if (!email) {
//       toast({
//         description: "Email not found in localStorage.",
//       });
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(`/api/payment/customer-credits`, {
//         params: { email }, 
//       });
//       setCredits(response.data.creditsRemaining); 
//     } catch (error) {
//       toast({
//         description: "Failed to fetch customer credits.",
//       });
//     }
//   };


  
//   useEffect(() => {
//     handlePaymentWebhook(); 
//     fetchCustomerCredits();

//   }, []);

//   return {
//     pickFiles,
//     file,
//     isUploading,
//     credits,
//     handlePickFileChange,
//     handleFileChange,
//     handleUpload,
//   };
// };


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
  
  const handlePaymentWebhook = async () => {
    const sessionId = localStorage.getItem("sessionId");
    // console.log(sessionId, "intro");
  
    if (!sessionId) {
      console.error("Session ID is missing");
      return;
    }
  
    try {
      // Create FormData and append the sessionId
      const formData = new FormData();
      formData.append("sessionId", sessionId);
  
      const response = await axiosInstance.post(
        "/api/payment/paymongo-webhook",
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      // cs_nYQMNvEn8vV8EycFBkb2jW8q
      // const { message } = response.data; 
      // console.log("Webhook message:", message);
      localStorage.removeItem("sessionId");
  
    } catch (error) {
      // console.error("Error fetching webhook:", error.response ? error.response.data : error.message);
    }
  };
  const fetchCustomerCredits = async () => {
    await handlePaymentWebhook();

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
      setCredits(response.data.creditsRemaining);
    } catch (error) {
      toast({
        description: "Failed to fetch customer credits.",
      });
    }
  };

  useEffect(() => {
    fetchCustomerCredits();
    // const sessionId = localStorage.getItem("ses");
    // if (sessionId) {
    //   handlePaymentWebhook();
    // }
  }, []); // Ensure that the webhook only runs if sessionID is present

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
