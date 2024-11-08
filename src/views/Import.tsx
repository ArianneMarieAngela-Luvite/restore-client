// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription } from "@/components/ui/card";
// import { ImportController } from "../controllers/ImportController"; 
// import { ClipLoader } from "react-spinners";
// // import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { Audio } from 'react-loader-spinner';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
// import { useNavigate } from "react-router-dom";

// export const Import = () => {
//   const navigate = useNavigate();
//   const {
//     pickFiles,
//     file,
//     isUploading,
//     credits,
    
//     handlePickFileChange,
//     handleFileChange,
//     handleUpload,
//   } = ImportController();

//   const truncateFileName = (name: string) => {
//     const maxLength = 20;
//     return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
//   };

//   const navigateBillInfo = () => {
//     navigate("/billing-information");
//   }

//   return (
//     <div className="flex flex-col  items-center h-screen">
//       <div className="flex ml-auto mx-5 mt-3 md:ml-auto md:mx-24 md:mt-3 font-rubik font-bold bg-customCardColor p-3 rounded-lg gap-1 "> 
//         Credits: 
//         <span className="font-bold px-2 ">{credits}</span>
//         <svg 
//           onClick={navigateBillInfo}
//           className="w-6 h-6 text-primary hover:text-primary/80 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//           <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
//         </svg>

//       </div>
//       {isUploading ? (
//         <div className="flex sm:h-[176px] lg:w-3/4 xl:w-2/4 md:h-[176px] border-0 mt-9 md:mt-16 mb-8 w-full px-5 h-2/6">
//         <Card className="
//         h-64 flex w-full bg-primary border-0 mb-8 
//         sm:h-44
//         ">
          
//           <Card className="
//           h-60 flex flex-col gap-5 bg-customCardColor w-full  justify-center items-center
//           sm:h-40 
//           "
//           >
//             <CardDescription className="
//             mt-5 font-lato text-lg
//             sm:text-xl ">
//               Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
//             </CardDescription>

//             <CardContent className="
//             flex items-center flex-col 
//             sm:flex-row ">
//               <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row items-center rounded-lg">

//               <Select disabled={isUploading} onValueChange={handlePickFileChange}>
//                 <SelectTrigger className='w-[110px] bg-white border'>
//                   <SelectValue placeholder="Select file" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {pickFiles.map((pickFile) => (
//                     <SelectItem key={pickFile.id} value={pickFile.id} className='text-left'>
//                       {pickFile.value}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

              
//               <input
//                 type="file"
//                 id="fileInput"
//                 className="hidden"
//                 accept=".csv,.xlsx"
//                 onChange={handleFileChange}
//                 disabled={isUploading}
//               />

//               <div className="text-sm font-lato p-2 px-4 mb-1 text-gray-700">
//                 <div className="font-semibold">
//                   {file ? truncateFileName(file.name) : "No file chosen"}
//                 </div>
//               </div>



//               </div>
             
              

//               <Button onClick={handleUpload} disabled={isUploading} className="font-lato">
//                 {isUploading ? (
//                   <div className="flex items-center"> 
//                     {/* <span className="mr-2">Uploading</span>
//                     <ClipLoader size={18} color="white" /> */}
//                     <Audio
//                       height="80"
//                       width="80"
//                       // radius="9"
//                       color="green"
//                       ariaLabel="loading"
//                     />
//                   </div>) : (
//                     "Upload File"
//                    )
//                 }
//               </Button>
//             </CardContent>
//           </Card>
//         </Card>
//       </div>

//       <div className="
//         p-3  h-48 justify-center items-center border-none w-full px-8
//         xl:w-2/4
//         ">
//         <span className="text-primary font-semibold">Note:</span>
//         <ul className="
//           list-disc m-3 font-lato text-sm leading-7
//           md:text-base
//         ">
//           <li>Accepted file formats: CSV (.csv), Excel (.xlsx)</li>
//           <li>Data entry must not exceed 35,000 rows.</li>
//           <li>
//             To import files successfully, files must have column names (header). e.g. (Product, ProductID, UnitsSold, Month, Sales)
//           </li>
//         </ul>
//       </div>
//       ): (
//         <div>
//           <Audio />
//         </div>
//       )}

      
//     </div>
//   );
// };

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription } from "@/components/ui/card";
// import { ImportController } from "../controllers/ImportController"; 
// import { Audio } from 'react-loader-spinner';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import transition from "@/constants/transition";


// const Import = () => {
//   const navigate = useNavigate();
//   const {
//     pickFiles,
//     file,
//     isUploading,
//     credits,
//     handlePickFileChange,
//     handleFileChange,
//     handleUpload,
//   } = ImportController();

//   const truncateFileName = (name: string) => {
//     const maxLength = 20;
//     return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
//   };

//   const navigateBillInfo = () => {
//     navigate("/billing-information");
//   };

//   return (
//     <AnimatePresence>
//       <motion.div 
//         initial={{ x: "100%" }}
//         animate={{ x: 0 }}
//         exit={{ x: "100%" }}
//         transition={{ duration: 0.5 }} 
//         // initial={{ scaleX: 0 }}
//         // animate={{ scaleX:0 }}
//         // exit={{ scaleX:1 }}
//         // transition={{ duration: 1, ease: [0.22, 1, 0.36, 1]}}
//         className="slide-in flex flex-col items-center h-screen  overflow-hidden"
//       >
//         {!isUploading && (
//           <motion.div 
//             className="flex ml-auto mx-5 mt-3 md:ml-auto md:mx-24 md:mt-3 font-rubik font-bold bg-customCardColor p-3 rounded-lg gap-1"
//             // initial={{ opacity: 0 }}
//             // animate={{ opacity: 1 }}
//             // exit={{ opacity: 0 }}
//           > 
//             Credits: 
//             <span className="font-bold px-2 ">{credits}</span>
//             <svg 
//               onClick={navigateBillInfo}
//               className="w-6 h-6 text-primary hover:text-primary/80 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
//             >
//               <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/>
//             </svg>
//           </motion.div>
//         )}

//         {isUploading ? (
//           <motion.div 
//             className="flex items-center justify-center pt-60"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <Audio color={"#30a75f"} height={100} width={100} ariaLabel="loading" />
//           </motion.div>
//         ) : (
//           <motion.div 
//             className="flex-row sm:h-[176px] lg:w-3/4 xl:w-2/4 md:h-[176px] border-0 mt-9 md:mt-16 mb-8 w-full px-5 h-2/6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <Card className="h-64 flex w-full bg-primary border-0 mb-8 sm:h-44">
//               <Card className="h-60 flex flex-col gap-5 bg-customCardColor w-full justify-center items-center sm:h-40">
//                 <CardDescription className="mt-5 font-lato text-lg sm:text-xl">
//                   Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
//                 </CardDescription>
//                 <CardContent className="flex items-center flex-col sm:flex-row">
//                   <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row items-center rounded-lg">
//                     <Select disabled={isUploading} onValueChange={handlePickFileChange}>
//                       <SelectTrigger className='w-[110px] bg-white border'>
//                         <SelectValue placeholder="Select file" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {pickFiles.map((pickFile) => (
//                           <SelectItem key={pickFile.id} value={pickFile.id} className='text-left'>
//                             {pickFile.value}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>

//                     <input
//                       type="file"
//                       id="fileInput"
//                       className="hidden"
//                       accept=".csv,.xlsx"
//                       onChange={handleFileChange}
//                       disabled={isUploading}
//                     />

//                     <div className="text-sm font-lato p-2 px-4 mb-1 text-gray-700">
//                       <div className="font-semibold">
//                         {file ? truncateFileName(file.name) : "No file chosen"}
//                       </div>
//                     </div>
//                   </div>

//                   <Button onClick={handleUpload} disabled={isUploading} className="font-lato">
//                     {isUploading ? (
//                       <div className="flex items-center"> 
//                         <Audio color="green" height={20} width={20} ariaLabel="loading" />
//                       </div>
//                     ) : (
//                       "Upload File"
//                     )}
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Card>

//             <div className="p-3 h-48 justify-center items-center border-none w-full px-8">
//               <span className="text-primary font-semibold">Note:</span>
//               <ul className="list-disc m-3 font-lato text-sm leading-7 md:text-base">
//                 <li>Accepted file formats: CSV (.csv), Excel (.xlsx)</li>
//                 <li>Data entry must not exceed 35,000 rows.</li>
//                 <li>To import files successfully, files must have column names (header). e.g. (Product, ProductID, UnitsSold, Month, Sales)</li>
//               </ul>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     </AnimatePresence>
//   );
// };
// export default transition(Import);


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { ImportController } from "../controllers/ImportController"; 
import { Audio } from 'react-loader-spinner';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import transition from "@/constants/transition";

const Import = () => {
  const navigate = useNavigate();
  const {
    pickFiles,
    file,
    isUploading,
    credits,
    handlePickFileChange,
    handleFileChange,
    handleUpload,
  } = ImportController();

  const truncateFileName = (name: string) => {
    const maxLength = 20;
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  const navigateBillInfo = () => {
    navigate("/billing-information");
  };

  return (
    <AnimatePresence>
      {/* Overlay for loader */}
      {isUploading && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ opacity: "100%" }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-customBackground"
        >
          <Audio color="#30a75f" height={100} width={100} ariaLabel="loading" />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="slide-in flex flex-col items-center h-screen overflow-hidden"
      >
          <motion.div 
            className="flex ml-auto mx-5 mt-3 md:ml-auto md:mx-24 md:mt-3 font-rubik font-bold bg-customCardColor p-3 rounded-lg gap-1"
          > 
            Credits: 
            <span className="font-bold px-2 ">{credits}</span>
            <svg 
              onClick={navigateBillInfo}
              className="w-6 h-6 text-primary hover:text-primary/80 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
            >
              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/>
            </svg>
          </motion.div>
        

 
          <motion.div 
            className="flex-row sm:h-[176px] lg:w-3/4 xl:w-2/4 md:h-[176px] border-0 mt-9 md:mt-16 mb-8 w-full px-5 h-2/6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="h-64 flex w-full bg-primary border-0 mb-8 sm:h-44">
              <Card className="h-60 flex flex-col gap-5 bg-customCardColor w-full justify-center items-center sm:h-40">
                <CardDescription className="mt-5 font-lato text-lg sm:text-xl">
                  Choose <span className="text-primary font-bold">CSV/Excel</span> Files Here
                </CardDescription>
                <CardContent className="flex items-center flex-col sm:flex-row">
                  <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row items-center rounded-lg">
                    <Select disabled={isUploading} onValueChange={handlePickFileChange}>
                      <SelectTrigger className='w-[110px] bg-white border'>
                        <SelectValue placeholder="Select file" />
                      </SelectTrigger>
                      <SelectContent>
                        {pickFiles.map((pickFile) => (
                          <SelectItem key={pickFile.id} value={pickFile.id} className='text-left'>
                            {pickFile.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept=".csv,.xlsx"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />

                    <div className="text-sm font-lato p-2 px-4 mb-1 text-gray-700">
                      <div className="font-semibold">
                        {file ? truncateFileName(file.name) : "No file chosen"}
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleUpload} disabled={isUploading} className="font-lato">
                    Upload File
                  </Button>
                </CardContent>
              </Card>
            </Card>

            <div className="p-3 h-48 justify-center items-center border-none w-full px-8">
              <span className="text-primary font-semibold">Note:</span>
              <ul className="list-disc m-3 font-lato text-sm leading-7 md:text-base">
                <li>Accepted file formats: CSV (.csv), Excel (.xlsx)</li>
                <li>Data entry must not exceed 35,000 rows.</li>
                <li>To import files successfully, files must have column names (header). e.g. (Product, ProductID, UnitsSold, Month, Sales)</li>
              </ul>
            </div>
          </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default transition(Import);
