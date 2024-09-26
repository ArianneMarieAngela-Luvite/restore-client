// import { Button } from "@/components/ui/button";
// import { Card, CardDescription } from "@/components/ui/card";
// import { ImportController } from "../controllers/ImportController"; // Import the controller hook

// export const Import = () => {
//   const {
//     pickFiles,
//     selectedFile,
//     file,
//     isUploading,
//     handlePickFileChange,
//     handleFileChange,
//     handleUpload,
//   } = ImportController();

//   return (
//     <div className="flex flex-col items-center w-screen h-screen">
//       <Card className="flex w-2/4 h-44 bg-primary border-0 mt-16 mb-8">
//         <Card className="flex flex-col gap-7 bg-customCardColor w-full h-40 justify-center items-center">
//           <CardDescription className="text-xl font-lato">
//             Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
//           </CardDescription>
//           <div className="flex gap-4 items-center">
//             <select
//               className="border rounded-lg p-2 h-10 font-lato text-sm"
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
//             <Button onClick={handleUpload} disabled={isUploading} className="font-lato">
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
              className="border rounded-lg p-2 h-10 font-lato text-sm"
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
            {file && (
            <div className="text-sm font-lato text-gray-700">
              <span className="font-semibold">{file.name}</span>
            </div>
          )}
            <Button onClick={handleUpload} disabled={isUploading} className="font-lato">
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
