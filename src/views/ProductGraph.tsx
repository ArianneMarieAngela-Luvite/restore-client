// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { axiosInstance } from "../services/axios";
// import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"; 
// import { ComboboxDemo } from "@/components/ui/combobox";
// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { ClipLoader } from "react-spinners";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import { Button } from "@/components/ui/button";

// export default function ProductGraph() {
//   const username = localStorage.getItem("username");
//   const [products, setProducts] = useState([]);
//   const [parsedData, setParsedData] = useState([]);
//   const [selectedProductID, setSelectedProductID] = useState("");
//   const [selectedYears, setSelectedYears] = useState(1);
//   const [isLoading, setIsLoading] = useState(true); 
//   const chartRef = useRef<HTMLDivElement>(null);

//   const yearColors = [
//     "hsl(210, 80%, 60%)", // Blue
//     "hsl(120, 80%, 60%)", // Green
//     "hsl(0, 80%, 60%)",   // Red
//     "hsl(60, 80%, 60%)",  // Yellow
//     "hsl(300, 80%, 60%)", // Purple
//     "hsl(30, 80%, 60%)",  // Orange
//     "hsl(180, 80%, 60%)", // Teal
//   ];

//   useEffect(() => {
//     const fetchProductData = async () => {
//       setIsLoading(true); // Start loading
//       try {
//         const response = await axiosInstance.get(`/api/Demand/demand/${username}`);
//         const data = response.data;

//         setProducts(data);
//         if (data.length > 0) {
//           setSelectedProductID(data[0].ProductID);
//           updateParsedData(data[0].Records);
//         }
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       } finally {
//         setIsLoading(false); // End loading
//       }
//     };

//     fetchProductData();
//   }, [username]);

//   const updateParsedData = (records) => {
//     const salesDataByMonthAndYear = {};
  
//     records.forEach((record) => {
//       const [month, , year] = record.Month.split("/");
//       const monthIndex = parseInt(month) - 1;
  
//       if (!salesDataByMonthAndYear[year]) {
//         salesDataByMonthAndYear[year] = Array(12).fill(0);
//       }
//       salesDataByMonthAndYear[year][monthIndex] += parseInt(record.UnitsSol);
//     });
  
//     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     const formattedData = months.map((monthName, index) => {
//       const monthData = { month: monthName };
  
//       Object.keys(salesDataByMonthAndYear).forEach((year) => {
//         monthData[year] = salesDataByMonthAndYear[year][index] || 0;
//       });
  
//       return monthData;
//     });

//     // Sort years and get the most recent ones based on selectedYears
//     const allYears = Object.keys(salesDataByMonthAndYear).sort();
//     const latestYears = allYears.slice(-selectedYears);

//     const finalData = formattedData.map((dataPoint) => {
//       const filteredPoint = { month: dataPoint.month };
//       latestYears.forEach(year => {
//         filteredPoint[year] = dataPoint[year] || 0;
//       });
//       return filteredPoint;
//     });

//     setParsedData(finalData);
//   };

//   const handleProductChange = (selectedID) => {
//     const selectedProduct = products.find((product) => product.ProductID === selectedID);
//     if (selectedProduct) {
//       updateParsedData(selectedProduct.Records);
//       setSelectedProductID(selectedID);
//     }
//   };

//   const getLatestYears = () => {
//     if (!parsedData || parsedData.length === 0) return [];
//     return Object.keys(parsedData[0]).filter(key => key !== 'month');
//   };

//   // Ensure that `updateParsedData` is called when `selectedYears` changes
//   useEffect(() => {
//     const selectedProduct = products.find((product) => product.ProductID === selectedProductID);
//     if (selectedProduct) {
//       updateParsedData(selectedProduct.Records);
//     }
//   }, [selectedYears, selectedProductID, products]);

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
//       pdf.text( `${selectedYears} Trend`, textX, textY);
  
//       // Add image to PDF below the text
//       pdf.addImage(imgData, "PNG", margin, textY + 20, imgWidth, imgHeight);
  
//       // Save the PDF
//       pdf.save("product_graph_forecast.pdf");
//     }
//   };

//   return (
//     <>
//       <motion.div 
//         className="flex items-center px-24 pt-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.2, delay: 0.2 }}
//       >
//         <p className="mr-5 font-lato">Year</p>
//         <div className="flex gap-4 items-center font-lato">
//           {[1, 3, 5].map((year) => (
//             <button
//               key={year}
//               onClick={() => setSelectedYears(year)}
//               className={`px-4 h-8 w-8 text-xs flex justify-center items-center py-2 rounded-lg ${selectedYears === year ? "bg-primary text-white" : "bg-transparent"}`}
//             >
//               {year}
//             </button>
//           ))}
//         </div>
//         <div className="flex gap-2 ml-auto">
//           <ComboboxDemo
//             items={products}
//             onSelect={handleProductChange}
//           />
//           <Button onClick={exportToPDF}>Export to PDF</Button>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.2, delay: 0.2 }}
//       >
//         <Card className="mx-20 mt-5 mb-20" ref={chartRef}>
//           <CardHeader className="p-4">
//             <h2 className="text-lg font-semibold">Product Demand</h2>
//           </CardHeader>
//           <CardContent>
//             {isLoading ? (
//                <div className="flex justify-center items-center h-96">
//                <ClipLoader color="#4A90E2" size={50} />
//              </div>
//             ) : (
//               <ResponsiveContainer width="100%" height={400}>
//               {parsedData.length > 0 ? (
//                 <LineChart data={parsedData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   {getLatestYears().map((year, index) => (
//                     <Line
//                       key={year}
//                       type="monotone"
//                       dataKey={year}
//                       stroke={yearColors[index % yearColors.length]} // Assign color dynamically
//                       name={`Sales in ${year}`}
//                     />
//                   ))}
//                 </LineChart>
//                 ) : (
//                   <div className="flex items-center justify-center h-full">
//                     <p className="text-gray-500">No data available</p>
//                   </div>
//                 )}
//               </ResponsiveContainer>
//             )}
//           </CardContent>
//           <CardFooter className="flex justify-center">
//             {getLatestYears().map((year, index) => (
//               <div key={year} className="flex items-center mr-4">
//                 <div
//                   className="w-4 h-4 rounded-full"
//                   style={{ backgroundColor: yearColors[index % yearColors.length] }}
//                 />
//                 <span className="ml-2">{year}</span> {/* Display only the year */}
//               </div>
//             ))}
//           </CardFooter>
//         </Card>
//       </motion.div>
//     </>
//   );
// }


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"; 
import { ComboboxDemo } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { ProductGraphController } from "../controllers/ProductGraphController";

export default function ProductGraph() {
  const {
    products,
    parsedData,
    selectedYears,
    selectedProductID,
    isLoading,
    yearColors,
    chartRef,
    tickFormatter,
    handleProductChange,
    setSelectedYears,
    getLatestYears,
    exportToPDF,
  } = ProductGraphController();

  return (
    <>
      <motion.div 
        className="flex flex-col md:flex-row items-center px-24 pt-8 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        
        <div className="flex gap-4 items-center justify-center md:justify-start font-lato xs:w-screen">
          <p className="mr-5 font-lato">Year</p>
          {[1, 3, 5].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYears(year)}
              className={`px-4 h-9 md:w-14 text-sm flex justify-center items-center py-2 rounded-lg border w-28
                ${selectedYears === year ? "bg-primary text-white font-bold" : "bg-transparent"}`}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="flex gap-3 md:ml-auto xs:w-screen justify-center md:justify-end xs:justify-center"
        >
          <ComboboxDemo
            items={products}
            onSelect={handleProductChange}
            
          />
          <Button onClick={exportToPDF}>Export to PDF</Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <Card className="md:mx-20 md:mt-5 md:mb-20 " ref={chartRef}>
          <CardHeader className="p-4">
            <h2 className="md:text-lg text-base font-semibold px-6 py-3">Product Demand</h2>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <ClipLoader color="#4A90E2" size={50} />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                {parsedData.length > 0 ? (
                  <LineChart data={parsedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" className="md:text-sm text-xs" tickFormatter={tickFormatter} />
                    <YAxis className="md:text-sm text-xs" />
                    <Tooltip />
                    {getLatestYears().map((year, index) => (
                      <Line
                        key={year}
                        type="monotone"
                        dataKey={year}
                        stroke={yearColors[index % yearColors.length]}
                        name={`Sales in ${year}`}
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
          <div className="flex justify-center items-center pb-4 md:text-base text-xs">
          {getLatestYears().map((year, index) => (
              <div key={year} className="flex items-center justify-center mr-4">
                <div
                  className="md:w-4 md:h-4 w-2 h-2 rounded-full"
                  style={{ backgroundColor: yearColors[index % yearColors.length] }}
                />
                <span className="ml-2">{year}</span> 
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </>
  );
}
