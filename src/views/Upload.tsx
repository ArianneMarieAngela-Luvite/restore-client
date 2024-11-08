import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import only the Card components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadController } from "@/controllers/UploadController";

export function Upload() {
  // Using the UploadController to manage the upload process
  const { handleUpload } = UploadController();

  // State to manage the upload status and response
  const [isUploading, setIsUploading] = useState(false); // True when uploading
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const navigate = useNavigate();
  // Function to handle the upload process
  const startUpload = async () => {
    setIsUploading(true);
    setUploadStatus("idle");
  
    try {
      const response = await handleUpload();
      console.log("Response from handleUpload:", response); // Add this log to inspect the response
      
      if (response && response.success) {
        setUploadStatus("success");
        setTimeout(() => navigate("/sales-forecast"), 2000); // Navigate after successful upload
      } else {
        setUploadStatus("error");
      }
    } catch (error) {
      console.error("An error occurred during the upload:", error);
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <motion.div
      className="min-h-screen bg-customBackground flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="max-w-sm w-full h-3/4 xl:shadow lg:shadow md:shadow sm:shadow xs:bg-transparent">
        <CardHeader className="px-10">
          <CardTitle className="text-2xl font-bold py-5 items-center flex justify-center">
            {uploadStatus === "success" ? "Upload Completed" : "Restore"}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-10 flex flex-col items-center justify-center">
          {isUploading && (
            <div className="flex items-center mb-4">
              <ClipLoader size={30} color="#000" />
              <span className="ml-2 text-lg">Uploading, please wait...</span>
            </div>
          )}

          {!isUploading && uploadStatus === "error" && (
            <div className="text-red-500 mb-4">Upload failed. Please try again.</div>
          )}

          <button
            onClick={startUpload}
            disabled={isUploading} // Disable the button while uploading
            className={`bg-blue-500 text-white py-2 px-4 rounded ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUploading ? "Uploading..." : "Proceed"}
          </button>

          {uploadStatus === "success" && (
            <div className="text-green-500 mt-4">File uploaded successfully!</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
