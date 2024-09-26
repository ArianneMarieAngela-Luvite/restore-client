// import { Button } from "@/components/ui/button"
// import { Card, CardDescription} from "@/components/ui/card"


// interface pickFile {
//   id: number;
//   value: string;
//   api: string;
// }

// const pickFiles: pickFile[] = [
//   {id: 1, value: 'Sales', api: 'api/Sales/upload/sales'},
//   {id: 2, value: 'Demand', api: 'api/Demand/upload/demand'}
// ]

// export const Import = () => {
  

//   return (
//     <div className="flex flex-col items-center w-screen h-screen">
//       <Card className="flex w-2/4 h-44 bg-primary border-0 mt-16 mb-8">
//         <Card className="flex flex-col gap-7 bg-customCardColor w-full h-40 justify-center items-center">
//           <CardDescription className="text-xl font-lato">Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here</CardDescription>
//           <div>
//             <select>
//               {pickFiles.map((pickFile) => (
//                 <pickFile key={pickFile.id} value={pickFile.value}>
//                   {pickFile.value}
//                 </pickFile>
//                 ))}
//             </select>
//             <Button className="font-lato h-9 text-xs" >Browse Files</Button>
//           </div>
          
//         </Card>
//       </Card>
//       <div className="p-2 w-2/4 h-48 justify-center items-center border-none">
//         <span className="text-primary font-semibold">Note:</span>
//         <ul className="list-disc m-3 font-lato text-sm leading-7">
//             <li>Accepted file formats: CSV (.csv), Excel (.xlxs)</li>
//             <li>Data entry must not exceed 35,000 rows.</li>
//             <li>To import files successfully, files must have column names (header). e.g. (product_Name, productSales, product_price)</li>
//         </ul>
//       </div>

//     </div>
//   )
// }

// export default Import;


// import { Button } from "@/components/ui/button";
// import { Card, CardDescription } from "@/components/ui/card";
// import { useState } from "react";
// import { axiosInstance } from "../services/axios"; // Import your axiosInstance
// import Papa from 'papaparse'; // Add this for parsing CSV files

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
//   const [isUploading, setIsUploading] = useState(false); // New state for tracking upload status

//   const handlePickFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = parseInt(event.target.value, 10);
//     const selectedOption = pickFiles.find((option) => option.id === selectedId);
//     if (selectedOption) {
//       setSelectedFile(selectedOption);
//       document.getElementById("fileInput")?.click(); // Automatically trigger the file input dialog
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || !selectedFile) {
//       alert("Please select a file and a file type.");
//       return;
//     }

//     const username = localStorage.getItem("username"); // Retrieve username from localStorage
//     if (!username) {
//       alert("No username found. Please log in.");
//       return;
//     }

//     // Use PapaParse to parse the CSV file into an array of objects
//     Papa.parse(file, {
//       header: true,
//       dynamicTyping: true,
//       complete: async (results) => {
//         const data = results.data; // This will be an array of objects
//         const payload = {
//           username,
//           records: data, // Pass the records to the payload
//         };

//         try {
//           setIsUploading(true); // Start uploading
//           const response = await axiosInstance.post(selectedFile.api, payload, {
//             headers: {
//               "Content-Type": "application/json", // Change content type to JSON
//             },
//           });
//           console.log("File uploaded successfully:", response.data);
//           alert("File uploaded successfully!");
//         } catch (error) {
//           console.error("Error uploading file:", error);
//           alert("Failed to upload file. Please try again.");
//         } finally {
//           setIsUploading(false); // End uploading
//         }
//       },
//       error: (error) => {
//         console.error("Error parsing file:", error);
//         alert("Failed to parse file. Please ensure it is a valid CSV.");
//       },
//     });
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
//               disabled={isUploading} // Disable dropdown while uploading
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
//               disabled={isUploading} // Disable file input while uploading
//             />
//             <Button onClick={handleUpload} disabled={isUploading}>
//               {isUploading ? "Uploading..." : "Upload File"} {/* Change button text during upload */}
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
// }
// new error


// import { Button } from "@/components/ui/button";
// import { Card, CardDescription } from "@/components/ui/card";
// import { useState } from "react";
// import { axiosInstance } from "../services/axios"; // Import your axiosInstance
// import * as XLSX from "xlsx"; // Import XLSX for Excel parsing
// import Papa from "papaparse"; // Import PapaParse for CSV parsing

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
//   const [isUploading, setIsUploading] = useState(false); // State for tracking upload status

//   const handlePickFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = parseInt(event.target.value, 10);
//     const selectedOption = pickFiles.find((option) => option.id === selectedId);
//     if (selectedOption) {
//       setSelectedFile(selectedOption);
//       document.getElementById("fileInput")?.click(); // Automatically trigger the file input dialog
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || !selectedFile) return;
  
//     setIsUploading(true); // Set uploading state
//     const username = localStorage.getItem("username"); // Get username from localStorage
  
//     // Create a FormData object to send records
//     const formData = new FormData();
    
//     // Use FileReader to read the file
//     const reader = new FileReader();
    
//     reader.onload = async (e) => {
//       try {
//         const binaryString = e.target?.result as string; // Get the binary string
//         console.log(binaryString);
//         console.log(username);
//         // Append the binary string and username to formData
//         formData.append("username", username || ""); // Append username
//         formData.append("file", binaryString); // Attach the binary string directly
  
//         // Send the binary string and username to the backend
//         const response = await axiosInstance.post(selectedFile.api, formData, {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded", // Use this content type to send raw data
//           },
//         });
//         console.log("Upload successful:", response.data);
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       } finally {
//         setIsUploading(false); // Reset uploading state
//         setFile(null); // Reset file state
//         setSelectedFile(null); // Reset selected file state
//       }
//     };
  
//     // Read the file as a binary string
//     reader.readAsBinaryString(file);
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
//               disabled={isUploading} // Disable dropdown while uploading
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
//               disabled={isUploading} // Disable file input while uploading
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
//bad req 400






// import { Button } from "@/components/ui/button";
// import { Card, CardDescription } from "@/components/ui/card";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";

// interface ImportProps {
//   onBrowseClick: () => void; // Prop for handling file browse click
// }

// export const Import: React.FC<ImportProps> = ({ onBrowseClick }) => {
//   return (
//     <div className="flex flex-col items-center w-screen h-screen">
//       <Card className="flex w-2/4 h-44 bg-primary border-0 mt-16 mb-8">
//         <Card className="flex flex-col gap-7 bg-customCardColor w-full h-40 justify-center items-center">
//           <CardDescription className="text-xl font-lato">
//             Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
//           </CardDescription>
//           <Select>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select Files" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="sales" onClick={onBrowseClick}>Sales</SelectItem>
//               <SelectItem value="demand" onClick={onBrowseClick}>Demand</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button className="font-lato h-9 text-xs" >
//             Upload
//           </Button>
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

// // ImportView.tsx
// import { Button } from "@/components/ui/button";
// import { Card, CardDescription } from "@/components/ui/card";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";

// interface ImportProps {
//   onBrowseClick: () => void;
//   selectedFile: File | null;
//   errorMessage: string | null;
//   onTypeSelect: (type: string) => void;
//   selectedType: string | null;
//   onUpload: () => void;
//   uploading: boolean;
// }

// export const Import: React.FC<ImportProps> = ({
//   onBrowseClick,
//   selectedFile,
//   errorMessage,
//   onTypeSelect,
//   selectedType,
//   onUpload,
//   uploading,
// }) => {
//   return (
//     <div className="flex flex-col items-center w-screen h-screen">
//       <Card className="flex w-2/4 h-44 bg-primary border-0 mt-16 mb-8">
//         <Card className="flex flex-col gap-7 bg-customCardColor w-full h-40 justify-center items-center">
//           <CardDescription className="text-xl font-lato">
//             Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
//           </CardDescription>
//           <Select>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select Files" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="sales" onClick={() => onTypeSelect("sales")}>Sales</SelectItem>
//               <SelectItem value="demand" onClick={() => onTypeSelect("demand")}>Demand</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button 
//             className="font-lato h-9 text-xs" 
//             onClick={onUpload} 
//             disabled={uploading || !selectedFile || !selectedType}
//           >
//             {uploading ? "Uploading..." : "Upload File"}
//           </Button>
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
//       {selectedFile && <p className="text-sm text-primary mt-4">Selected file: {selectedFile.name}</p>}
//       {errorMessage && <p className="text-sm text-red-500 mt-2">{errorMessage}</p>}
//     </div>
//   );
// };

// import { Button } from "@/components/ui/button";
// import { Card, CardDescription } from "@/components/ui/card";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";

// interface ImportProps {
//   onBrowseClick: () => void; // Prop for handling file browse click
//   onSelectChange: (value: "sales" | "demand") => void; // Prop for handling selection change
// }

// export const Import: React.FC<ImportProps> = ({ onBrowseClick, onSelectChange }) => {
//   return (
//     <div className="flex flex-col items-center w-screen h-screen">
//       <Card className="flex w-2/4 h-44 bg-primary border-0 mt-16 mb-8">
//         <Card className="flex flex-col gap-7 bg-customCardColor w-full h-40 justify-center items-center">
//           <CardDescription className="text-xl font-lato">
//             Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
//           </CardDescription>
//           <Select onValueChange={onSelectChange}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select Files" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="sales">Sales</SelectItem>
//               <SelectItem value="demand">Demand</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button className="font-lato h-9 text-xs" onClick={onBrowseClick}>
//             Browse
//           </Button>
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


// import { Button } from "@/components/ui/button";
// import { Card, CardDescription } from "@/components/ui/card";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";

// interface ImportProps {
//   onBrowseClick: () => void; // Prop for handling file browse click
//   onSelectChange: (value: "sales" | "demand") => void; // Prop for handling the upload type selection
// }

// export const Import: React.FC<ImportProps> = ({ onBrowseClick, onSelectChange }) => {
//   return (
//     <div className="flex flex-col items-center w-screen h-screen">
//       <Card className="flex w-2/4 h-44 bg-primary border-0 mt-16 mb-8">
//         <Card className="flex flex-col gap-7 bg-customCardColor w-full h-40 justify-center items-center">
//           <CardDescription className="text-xl font-lato">
//             Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
//           </CardDescription>
//           <Select onValueChange={onSelectChange}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select Files" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="sales">Sales</SelectItem>
//               <SelectItem value="demand">Demand</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button className="font-lato h-9 text-xs" onClick={onBrowseClick}>
//             Browse
//           </Button>
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
import { useState } from "react";
import { axiosInstance } from "../services/axios";
import * as XLSX from "xlsx";
import Papa from "papaparse";

interface PickFile {
  id: number;
  value: string;
  api: string;
}

const pickFiles: PickFile[] = [
  { id: 1, value: "Sales", api: "api/Sales/upload/sales" },
  { id: 2, value: "Demand", api: "api/Demand/upload/demand" },
];

export const Import = () => {
  const [selectedFile, setSelectedFile] = useState<PickFile | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
    const username = localStorage.getItem("username") || ""; // Get the username

    const formData = new FormData();
    formData.append("username", username); // Append username

    // Append the file directly to formData
    formData.append("file", file); // Attach the selected file

    try {
      // Send the formData to the backend using the correct API endpoint
      const response = await axiosInstance.post(selectedFile.api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(response) {
        console.log("aryan")
        console.log(response)
      } else {
        console.log(response)
      }
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false); // Reset uploading state
      setFile(null); // Reset file state
      setSelectedFile(null); // Reset selected file state
    }
  };

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