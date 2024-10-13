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


// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription } from "@/components/ui/card";
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
//      <div className="
//       flex sm:h-[176px] md:w-2/4 md:h-[176px]  border-0 mt-16 mb-8 
//       w-3/4 h-2/6">
//       <Card className="flex w-full sm:h-44 md:h-44 lg:h-44 xl:h-44 bg-primary border-0 mb-8 h-full">
//         <Card className="h-[260px] flex flex-col gap-5 bg-customCardColor w-full sm:h-40 md:h-40 lg:h-40 xl:h-40 justify-center items-center">
//           <CardDescription className="mt-5 sm:text-xl md:text-xl lg:text-xl xl:text-xl font-lato text-lg">
//             Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
//           </CardDescription>

//           <CardContent className="flex gap-4 items-center flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row ">
//           <select
//               className="border rounded-lg p-2 h-10 font-lato text-sm cursor-pointer"
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
//             {file && (
//               <div className="text-sm font-lato text-gray-700">
//                 <span className="font-semibold">{file.name}</span>
//               </div>
//             )}
//             <Button onClick={handleUpload} disabled={isUploading} className="font-lato">
//               {isUploading ? "Uploading..." : "Upload File"}
//             </Button>
//           </CardContent>
          
//         </Card>
//       </Card>
//      </div>

//       <div className="p-2 w-3/4 md:w-2/4 lg:w-2/4 xl:w-2/4 h-48 justify-center items-center border-none">
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
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { ImportController } from "../controllers/ImportController"; 
import { ClipLoader } from "react-spinners";

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

  const truncateFileName = (name: string) => {
    const maxLength = 20;
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <div className="flex sm:h-[176px] lg:w-3/4 xl:w-2/4 md:h-[176px] border-0 mt-16 mb-8 w-3/4 h-2/6">
        <Card className="
        h-64 flex w-full bg-primary border-0 mb-8 
        sm:h-44
        ">
          <Card className="
          h-60 flex flex-col gap-5 bg-customCardColor w-full  justify-center items-center
          sm:h-40 
          "
          >
            <CardDescription className="
            mt-5 font-lato text-lg
            sm:text-xl ">
              Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
            </CardDescription>

            <CardContent className="
            flex gap-4 items-center flex-col 
            sm:flex-row ">
              <select
                className="border rounded-lg p-2 h-10 font-lato text-sm cursor-pointer"
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
                  <span className="font-semibold">
                    {truncateFileName(file.name)}
                  </span>
                </div>
              )}

              <Button onClick={handleUpload} disabled={isUploading} className="font-lato">
                {isUploading ? (
                  <div className="flex items-center"> 
                    <span className="mr-2">Uploading</span>
                    <ClipLoader size={18} color="white" />
                  </div>) : (
                    "Upload File"
                   )
                }
              </Button>
            </CardContent>
          </Card>
        </Card>
      </div>

      <div className="
        p-2 w-3/4 h-48 justify-center items-center border-none
        xl:w-2/4
      ">
        <span className="text-primary font-semibold">Note:</span>
        <ul className="
          list-disc m-3 font-lato text-sm leading-7
          md:text-base
        ">
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
