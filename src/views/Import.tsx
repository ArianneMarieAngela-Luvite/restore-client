// import { Button } from "@/components/ui/button";
// import { Card, CardDescription } from "@/components/ui/card";
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

// export const Import = () => {
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
//       if(response) {
//         console.log(response)
//       } else {
//         console.log(response)
//       }
//       console.log("Upload successful:", response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setIsUploading(false); 
//       setFile(null); 
//       setSelectedFile(null); // Reset selected file state
//     }
//   };

//   return (
//     <div className="flex flex-col items-center w-screen h-screen">
//       <Card className="flex w-2/4 h-44 bg-primary border-0 mt-16 mb-8">
//         <Card className="flex flex-col gap-7 bg-customCardColor w-full h-40 justify-center items-center">
//           <CardDescription className="text-xl font-lato">
//             Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
//           </CardDescription>
//           <div className="flex gap-4 items-center">
//             <select
//               className="border rounded p-2"
//               value={selectedFile?.id || ""}
//               onChange={handlePickFileChange}
//               disabled={isUploading}
//             >
//               <option value="" disabled hidden>
//                 Select File
//               </option>
//               {pickFiles.map((pickFile) => (
//                 <option key={pickFile.id} value={pickFile.id}>
//                   {pickFile.value}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="file"
//               id="fileInput"
//               className="hidden"
//               accept=".csv,.xlsx"
//               onChange={handleFileChange}
//               disabled={isUploading}
//             />
//             <Button onClick={handleUpload} disabled={isUploading}>
//               {isUploading ? "Uploading..." : "Upload File"}
//             </Button>
//           </div>
//         </Card>
//       </Card>

//       <div className="p-2 w-2/4 h-48 justify-center items-center border-none">
//         <span className="text-primary font-semibold">Note:</span>
//         <ul className="list-disc m-3 font-lato text-sm leading-7">
//           <li>Accepted file formats: CSV (.csv), Excel (.xlsx)</li>
//           <li>Data entry must not exceed 35,000 rows.</li>
//           <li>
//             To import files successfully, files must have column names (header). e.g. (product_Name, productSales, product_price)
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { ImportController } from "../controllers/ImportController"; // Import the controller hook

export const Import = () => {
  const {
    pickFiles,
    selectedFile,
    file,
    isUploading,
    handlePickFileChange,
    handleFileChange,
    handleUpload,
  } = ImportController();

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <Card className="flex w-2/4 h-44 bg-primary border-0 mt-16 mb-8">
        <Card className="flex flex-col gap-7 bg-customCardColor w-full h-40 justify-center items-center">
          <CardDescription className="text-xl font-lato">
            Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
          </CardDescription>
          <div className="flex gap-4 items-center">
            <select
              className="border rounded p-2"
              value={selectedFile?.id || ""}
              onChange={handlePickFileChange}
              disabled={isUploading}
            >
              <option value="" disabled hidden>
                Select File
              </option>
              {pickFiles.map((pickFile) => (
                <option key={pickFile.id} value={pickFile.id}>
                  {pickFile.value}
                </option>
              ))}
            </select>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload File"}
            </Button>
          </div>
        </Card>
      </Card>

      <div className="p-2 w-2/4 h-48 justify-center items-center border-none">
        <span className="text-primary font-semibold">Note:</span>
        <ul className="list-disc m-3 font-lato text-sm leading-7">
          <li>Accepted file formats: CSV (.csv), Excel (.xlsx)</li>
          <li>Data entry must not exceed 35,000 rows.</li>
          <li>
            To import files successfully, files must have column names (header). e.g. (product_Name, productSales, product_price)
          </li>
        </ul>
      </div>
    </div>
  );
};
