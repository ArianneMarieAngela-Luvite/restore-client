import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios";
import { toast } from "../hooks/use-toast";
// import { useNavigate } from "react-router-dom";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPOvx6MahBdMOE7eLYVn72ZljZj6OkY4Y",
  authDomain: "restore-db-98bee.firebaseapp.com",
  projectId: "restore-db-98bee",
  storageBucket: "restore-db-98bee",
  messagingSenderId: "871713588544",
  appId: "1:871713588544:web:6e5825ffc4212efa23e6a5",
};

interface PickFile {
  id: string;
  value: string;
  api: string;
}

const pickFiles: PickFile[] = [
  { id: "1", value: "Sales", api: "/api/Sales/upload/sales" },
  { id: "2", value: "Demand", api: "/api/Demand/upload/demand" },
];

export const UploadController = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
//   const navigate = useNavigate();

  // Initialize Firebase App
  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);

  const handleUpload = async () => {
    if (isUploading) {
        console.log("Upload already in progress. Please wait.");
        return; // Prevent multiple uploads
    }

    const username = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";

    console.log("Starting upload process...");

    // Check if the user has enough credits before uploading
    if (credits === null || credits <= 0) {
        console.log("Not enough credits to upload.");
        toast({
            description: "You do not have enough credits to upload the file.",
        });
        return;
    }

    setIsUploading(true); // Set upload in progress


    const storageRefProduct = ref(storage, `/uploaded_csv/productdemand_hermi.csv`);
    const storageRefSales = ref(storage, `/uploaded_csv/loaded_data_hermi.csv`);

      try {
          console.log("Fetching download URL from Firebase...");
          const downloadURL = await getDownloadURL(storageRefProduct); // Get the download URL
          

          console.log("Fetching file from download URL...");
          const response = await fetch(downloadURL); // Fetch the file from the download URL
          const blobProduct = await response.blob(); // Convert response to Blob

          // Fetch the file from the download URL
          

          // Convert the blob to a File object
          const file = new File([blobProduct], "productdemand_hermi.csv", { type: "text/csv" }); // Specify the MIME type
        

          // Create FormData for Demand upload
          const formDataDemand = new FormData();
          formDataDemand.append("file", file); // Append the File object as a file
          formDataDemand.append("username", username);
          formDataDemand.append("email", email);

          
          // Send the Demand upload request
          console.log("Sending POST request for Demand...");
          const demandResponse = await axiosInstance.post("/api/Demand/upload/demand", formDataDemand, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          });

          const downloadURL1 = await getDownloadURL(storageRefSales);
          const response1 = await fetch(downloadURL1);
          const blobSales = await response1.blob(); 
          const file1 = new File([blobSales], "loaded_data_hermi.csv", { type: "text/csv" }); // Specify the MIME type

          const formDataSales = new FormData();
          formDataSales.append("file", file1); // Append the File object as a file
          formDataSales.append("username", username);
          formDataSales.append("email", email);

          console.log("Sending POST request for Sales...");
          const salesResponse = await axiosInstance.post("/api/Sales/upload/sales", formDataSales, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          });

          // Handle Demand upload response
          if (demandResponse.status === 200 && salesResponse.status === 200) {
            console.log("Both uploads succeeded.");
            return { success: true }; // Make sure to return this object
          } else {
            console.log("One or both uploads failed.");
            return { success: false }; // If it fails, ensure you return this object
          }
          

      } catch (error) {
          console.error("An error occurred during the upload:", error);
          toast({
              description: "An error occurred during the upload.",
          });
      } finally {
          setIsUploading(false); // Reset upload state
          console.log("Upload process completed.");
      }
  };


  const fetchCustomerCredits = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      console.log("Email not found in localStorage.");
      toast({
        description: "Email not found in localStorage.",
      });
      return;
    }

    try {
      console.log("Fetching customer credits...");
      const response = await axiosInstance.get(`/api/payment/customer-credits`, {
        params: { email },
      });
      console.log("Customer credits response:", response.data);
      setCredits(response.data.creditsRemaining > 0 ? response.data.creditsRemaining : 0);
    } catch (error) {
      console.error("Failed to fetch customer credits:", error);
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
    isUploading,
    credits,
    handleUpload,
  };
};
