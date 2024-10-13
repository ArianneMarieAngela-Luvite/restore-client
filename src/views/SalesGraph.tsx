// import { useEffect, useRef, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// import { motion } from "framer-motion";
// import { axiosInstance } from "../services/axios"; 
// import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"; 
// import { Button } from "../components/ui/button";
// import html2canvas from "html2canvas"; // Import html2canvas
// import { jsPDF } from "jspdf"; // Import jsPDF
// import { ClipLoader } from "react-spinners";

// export default function SalesGraph() {
//   const username = localStorage.getItem("username");
//   const [parsedData, setParsedData] = useState([]);
//   const [selectedYears, setSelectedYears] = useState(1);
//   const [allYears, setAllYears] = useState([]);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [isLoading, setIsLoading] = useState(true); 

//   // Fetch sales data
//   useEffect(() => {
//     const fetchSalesData = async () => {
//       setIsLoading(true);
//       if (!username) {
//         console.error("Username not found in local storage.");
//         return;
//       }

//       try {
//         const response = await axiosInstance.get(`/api/Sales/sales/${username}`);
//         const salesData = JSON.parse(response.data.data);
//         handleParsedData(salesData.data);
//       } catch (err) {
//         console.error("Failed to fetch sales data:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSalesData();
//   }, [username]);

//   // Format sales data
//   const handleParsedData = (data) => {
//     const formattedDataMap = {};
//     const yearsSet = new Set();

//     for (const entry of data) {
//       const year = entry.Year;
//       const salesData = entry.SalesData;
//       yearsSet.add(year);

//       for (const monthData of salesData) {
//         const month = monthData.Month;

//         if (!formattedDataMap[month]) {
//           formattedDataMap[month] = { month };
//         }

//         formattedDataMap[month][year] = monthData.Sales;
//       }
//     }

//     const formattedDataArray = Object.values(formattedDataMap);
//     const sortedYears = Array.from(yearsSet).sort((a, b) => b - a);

//     setParsedData(formattedDataArray);
//     setAllYears(sortedYears);
//   };

//   const yearColors = [
//     "hsl(210, 80%, 60%)", // Blue
//     "hsl(120, 80%, 60%)", // Green
//     "hsl(0, 80%, 60%)",   // Red
//     "hsl(60, 80%, 60%)",  // Yellow
//     "hsl(300, 80%, 60%)", // Purple
//     "hsl(30, 80%, 60%)",  // Orange
//     "hsl(180, 80%, 60%)", // Teal
//   ];

//   // Format Y-axis with K/M suffixes
//   const formatYAxis = (value) => {
//     if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
//     if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
//     return `$${value}`;
//   };

//   // Get the latest N years from the parsed data in descending order
//   const getLatestYears = () => {
//     return allYears.slice(0, selectedYears).sort((a, b) => b - a);
//   };

//   const exportToPDF = async () => {
//     if (chartRef.current) {
//       // Adjust scale for lower quality
//       const canvas = await html2canvas(chartRef.current, { scale: 0.75 }); // Lower the scale for lower resolution
//       // Specify quality (0.5 = 50% quality)
//       const imgData = canvas.toDataURL("image/png", 0.75); // Adjust the quality
  
//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "pt",
//         format: [612, 792], 
//       });
  
//       const margin = 36;
//       const imgWidth = pdf.internal.pageSize.getWidth() - margin * 2;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
//       const textX = margin;
//       const textY = margin;
//       pdf.setFontSize(16);
//       pdf.text( `${selectedYears} Year/s Trend`, textX, textY);
  
//       // Add image to PDF below the text
//       pdf.addImage(imgData, "PNG", margin, textY + 20, imgWidth, imgHeight);
  
//       // save to PDF
//       pdf.save("sales_graph_forecast.pdf");
//     }
//   };
  
//   return (
//     <>
//       <motion.div
//         className="flex flex-col items-center p-5 gap-5 md:items-center md:px-24 md:pt-8 md:flex-row lg:items-center lg:px-24 lg:pt-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.2, delay: 0.2 }}
//       >
        
        
//         <div className="flex gap-4 items-center font-lato">
//         <p className="mr-5 font-lato">Year/s</p>
//           {[1, 3, 5, 10].map((year) => (
//             <button
//               key={year}
//               onClick={() => setSelectedYears(year)}
//               className={`px-4 h-8 w-8 text-xs flex justify-center items-center py-2 rounded-lg ${
//                 selectedYears === year ? "bg-primary text-white" : "bg-transparent"
//               }`}
//             >
//               {year}
//             </button>
//           ))}
//         </div>
//         <div className="md:ml-auto lg:ml-auto font-lato">
//         <select className="mr-3 border rounded-lg p-2 h-10 w-[150px] font-lato text-sm cursor-pointer hover:">
//           <option value="" disabled hidden>
//             Select File
//           </option>
//           <option value="pdf">Export to PDF</option>
//           <option value="excel">Export to Excel</option>
//         </select>
//         <Button  onClick={exportToPDF}>Export</Button>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.2, delay: 0.2 }}
//       >
//         <Card className="mx-20 mt-5 mb-20"  ref={chartRef}>
//           <CardHeader className="p-4">
//             <h2 className="text-lg font-semibold px-6 py-3 font-lato">Sales Data</h2>
//           </CardHeader>
//           <CardContent>
//           {isLoading ? (
//                <div className="flex justify-center items-center h-96">
//                <ClipLoader color="#4A90E2" size={50} /> {/* Spinner */} 
//              </div>
//             ) : (
//             <ResponsiveContainer width="100%" height={400}>
//             {parsedData.length > 0 ? (
//               <LineChart data={parsedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" tickMargin={10} />
//                 <YAxis tickFormatter={formatYAxis} tickMargin={10} />
//                 <Tooltip
//                   formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]}
//                   labelFormatter={(label) => `Month: ${label}`}
//                 />
//                 {/* Plot lines for the latest selected years */}
//                 {getLatestYears().map((year, index) => (
//                   <Line
//                     key={year}
//                     type="monotone"
//                     dataKey={year}
//                     name={`${year}`} // Show only the year
//                     stroke={yearColors[index % yearColors.length]}
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                     activeDot={{ r: 8 }}
//                   />
//                 ))}
//               </LineChart>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <p className="text-gray-500">No data available</p>
//               </div>
//             )}
              {/* <LineChart
                data={parsedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickMargin={10} />
                <YAxis tickFormatter={formatYAxis} tickMargin={10} />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]}
                  labelFormatter={(label) => `Month: ${label}`}
                />

                {getLatestYears().map((year, index) => (
                  <Line
                    key={year}
                    type="monotone"
                    dataKey={year}
                    name={`${year}`}
                    stroke={yearColors[index % yearColors.length]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart> */}
            {/* </ResponsiveContainer>
          )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {getLatestYears().map((year, index) => (
              <div key={year} className="flex items-center mr-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: yearColors[index % yearColors.length] }}
                />
                <span className="ml-2">{year}</span> 
              </div>
            ))}
          </CardFooter>
        </Card>       
      </motion.div>
    </>
  );
} */}


// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"; // Adjust the path as needed
// import { Button } from "../components/ui/button";
// import { ClipLoader } from "react-spinners";
// import { SalesGraphController } from "../controllers/SalesGraphController"; // Import controller

// export default function SalesGraph() {
//   const {
//     parsedData,
//     selectedYears,
//     setSelectedYears,
//     getLatestYears,
//     isLoading,
//     exportToPDF,
//     chartRef,
//   } = SalesGraphController();

//   const yearColors = [
//     "hsl(210, 80%, 60%)", // Blue
//     "hsl(120, 80%, 60%)", // Green
//     "hsl(0, 80%, 60%)",   // Red
//     "hsl(60, 80%, 60%)",  // Yellow
//     "hsl(300, 80%, 60%)", // Purple
//     "hsl(30, 80%, 60%)",  // Orange
//     "hsl(180, 80%, 60%)", // Teal
//   ];

//   const formatYAxis = (value) => {
//     if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
//     if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
//     return `$${value}`;
//   };

//   return (
//     <>
//       <motion.div
//         className="flex flex-col sm:flex-row items-center px-24 pt-8 gap-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.2, delay: 0.2 }}
//       >
//         <div className="
//           flex justify-end font-lato w-screen px-10 
//           sm:hidden">
//           <Button onClick={exportToPDF}>Export to PDF</Button>
//         </div>
//         <div className="
//           flex gap-4 items-center justify-center font-lato  px-10 
//           md:justify-start 
//           xs:w-screen">
//           <p className="mr-5 font-lato">Year</p>
//           {[1, 3, 5, 10].map((year) => (
//             <button
//               key={year}
//               onClick={() => setSelectedYears(year)}
//               className={`px-4 h-9 text-sm flex justify-center items-center py-2 rounded-lg border w-28 md:w-14
//                 ${selectedYears === year ? "bg-primary text-white font-bold" : "bg-transparent"}`}
//             >
//               {year}
//             </button>
//           ))}
//         </div>
//         <div className="
//           hidden justify-end px-10
//           md:ml-auto md:justify-end
//           sm:flex sm:visible  
//           xs:w-screen xs:justify-center">
//           <Button onClick={exportToPDF}>Export to PDF</Button>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.2, delay: 0.2 }}
//       >
//         <Card className="sm:mx-20 sm:mt-5 sm:mb-20" ref={chartRef}>
//           <CardHeader className="p-4">
//             <h2 className="md:text-lg text-base font-semibold px-6 py-3">Sales Data</h2>
//           </CardHeader>
//           <CardContent>
//             {isLoading ? (
//               <div className="flex justify-center items-center h-96">
//                 <ClipLoader color="#4A90E2" size={50} />
//               </div>
//             ) : (
//               <ResponsiveContainer width="100%" height={400}>
//                 {parsedData.length > 0 ? (
//                   <LineChart data={parsedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" className="md:text-sm text-xs" tickMargin={10} />
//                     <YAxis tickFormatter={formatYAxis} tickMargin={10} className="md:text-sm text-xs"/>
//                     <Tooltip
//                       formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]}
//                       labelFormatter={(label) => `Month: ${label}`}
//                     />
//                     {getLatestYears().map((year, index) => (
//                       <Line
//                         key={year}
//                         type="monotone"
//                         dataKey={year}
//                         name={`${year}`}
//                         stroke={yearColors[index % yearColors.length]}
//                         strokeWidth={2}
//                         dot={{ r: 4 }}
//                         activeDot={{ r: 8 }}
//                       />
//                     ))}
//                   </LineChart>
//                 ) : (
//                   <div className="flex items-center justify-center h-full">
//                     <p className="text-gray-500">No data available</p>
//                   </div>
//                 )}
//               </ResponsiveContainer>
//             )}
//           </CardContent>
//           <CardFooter className="flex justify-center items-center pb-4 md:text-base text-xs">
//             {getLatestYears().map((year, index) => (
//               <div key={year} className="flex items-center mr-4">
//                 <div
//                   className="md:w-4 md:h-4 w-2 h-2 rounded-full"
//                   style={{ backgroundColor: yearColors[index % yearColors.length] }}
//                 />
//                 <span className="ml-2">{year}</span>
//               </div>
//             ))}
//           </CardFooter>
//         </Card>
//       </motion.div>
//     </>
//   );
// }





// WORKING
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ClipLoader } from "react-spinners";
import { SalesGraphController } from "../controllers/SalesGraphController"; 

export default function SalesGraph() {
  const {
    parsedData,
    selectedYears,
    setSelectedYears,
    getLatestYears,
    isLoading,
    exportToPDF,
    chartRef,
  } = SalesGraphController();

  const yearColors = [
    "hsl(210, 80%, 60%)", // Blue
    "hsl(120, 80%, 60%)", // Green
    "hsl(0, 80%, 60%)",   // Red
    "hsl(60, 80%, 60%)",  // Yellow
    "hsl(300, 80%, 60%)", // Purple
    "hsl(30, 80%, 60%)",  // Orange
    "hsl(180, 80%, 60%)", // Teal
  ];

  const formatYAxis = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  return (
    <>
      <motion.div
        className="flex flex-col sm:flex-row items-center px-24 pt-8 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <div className="flex justify-end font-lato w-screen px-10 sm:hidden">
          <Button onClick={exportToPDF}>Export to PDF</Button>
        </div>
        <div className="flex gap-4 items-center justify-center font-lato px-10 md:justify-start xs:w-screen">
          <p className="mr-5 font-lato">Year</p>
          {[1, 3, 5, 10].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYears(year)}
              className={`px-4 h-9 text-sm flex justify-center items-center py-2 rounded-lg border w-28 md:w-14
                ${selectedYears === year ? "bg-primary text-white font-bold" : "bg-transparent"}`}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="hidden justify-end px-10 md:ml-auto md:justify-end sm:flex sm:visible xs:w-screen xs:justify-center">
          <Button onClick={exportToPDF}>Export to PDF</Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <Card className="sm:mx-20 sm:mt-5 sm:mb-20" ref={chartRef}>
          <CardHeader className="p-4">
            <h2 className="md:text-lg text-base font-semibold px-6 py-3">Sales Data</h2>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <ClipLoader color="#4A90E2" size={50} />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                {parsedData.length > 0 ? (
                  <LineChart
                    data={parsedData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" className="md:text-sm text-xs" tickMargin={10} />
                    <YAxis tickFormatter={formatYAxis} tickMargin={10} className="md:text-sm text-xs" />
                    <Tooltip
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    {getLatestYears().map((year, index) => (
                      <Line
                        key={year}
                        type="monotone"
                        dataKey={year} // Ensure this matches the year keys in parsedData
                        name={`${year}`}
                        stroke={yearColors[index % yearColors.length]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                  </LineChart>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No data available</p>
                  </div>
                )}
              </ResponsiveContainer>
            )}
          </CardContent>
          <CardFooter className="flex justify-center items-center pb-4 md:text-base text-xs">
            {getLatestYears().map((year, index) => (
              <div key={year} className="flex items-center mr-4">
                <div
                  className="md:w-4 md:h-4 w-2 h-2 rounded-full"
                  style={{ backgroundColor: yearColors[index % yearColors.length] }}
                />
                <span className="ml-2">{year}</span>
              </div>
            ))}
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
}
// WORKING 

