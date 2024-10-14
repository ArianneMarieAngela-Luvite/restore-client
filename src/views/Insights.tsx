// import { useEffect, useState } from "react";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Link, useLocation } from "react-router-dom";
// import timeline from "../assets/Vertical Timeline.png";
// import { NextMonthlyForecast } from "./NextMonthlyForecast";
// import { axiosInstance } from "../services/axios";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Button } from "@/components/ui/button";


// export default function Insights() {
//   const location = useLocation();
//   const [productDemandData, setProductDemandData] = useState([]);
//   const [insights, setInsights] = useState("");

//   // Mock Sales data for now
//   const sales = "₱14,324.53";

//   const username = localStorage.getItem("username");
//   console.log(username);

//   // Fetch demand data from API using axiosInstance
//   useEffect(() => {
//     if (username) {
//       axiosInstance.get(`/api/Demand/demand/${username}`)
//         .then(response => {
//           setProductDemandData(response.data);
//         })
//         .catch(error => {
//           console.error("Error fetching product demand data:", error);
//         });
//     }
//   }, [username]);

// useEffect(() => {
//     if (username) {
//       axiosInstance.get(`/api/Insight/${username}`)
//         .then(response => {
//           // Assuming response.data is an array, access the InsightData
//           if (response.data.length > 0) {
//             setInsights(response.data[0].InsightData);
//           }
//         })
//         .catch(error => {
//           console.error("Error fetching forecast insights:", error);
//         });
//     }
//   }, [username]);
//   return (
//     <div className="px-20 mb-8">        
//       <Button onClick={exportToExcel}>Export to Excel</Button>
//       <Card className="flex justify-between items-center w-full h-32 my-2 mb-5 bg-primary p-7">
//         <div className="ml-5">
//           <CardTitle className="font-lato text-customBackground font-thin text-md w-fit">Quarterly Sales</CardTitle>
//           <CardContent className="text-customBackground text-4xl font-bold font-lato p-0 mt-2 w-fit">{sales}</CardContent>
//         </div>
//         <div className="ml-auto p-0">
//           <img src={timeline} height={110} width={110} alt="Timeline" />
//         </div>
//       </Card>

//       <div className="flex gap-5">
//         <div className="flex flex-col w-2/5 gap-5">
//           <div className="bg-customCardColor px-5 py-3  rounded-md">
//             <h1 className=" font-lato text-base font-semibold text-gray-700 mx-2 my-2">Next Month Forecast</h1>
//             <Separator orientation="horizontal" className="bg-gray-300 h-[1px] mb-2 mx-2 w-[97%]" />
//             <div className="px-2">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Invoice</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Method</TableHead>
//                     <TableHead>Amount</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell>INV001</TableCell>
//                     <TableCell>Paid</TableCell>
//                     <TableCell>Credit Card</TableCell>
//                     <TableCell>$250.00</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </div>
            
//           </div>

//           <div className="bg-customCardColor rounded-lg p-4 h-96 font-lato">
//             <h1 className="text-base font-semibold text-gray-700 mx-4 mb-2">Forecast Insight</h1>
//             <Separator orientation="horizontal" className="bg-gray-300 mb-2 w-[94%] mx-4 h-[1px]" />
            
//             {/* Scrollable container for insights */}
//             <ScrollArea className="h-[85%] px-4">
//             {insights ? (
//                 <p className="font-lato leading-7 text-justify text-base text-gray-700 p-2">
//                   {insights}
//                 </p>
//               ) : (
//                 <p className="text-gray-500">No insights available at the moment.</p>
//               )}
//             </ScrollArea>
//           </div>
//         </div>

//         <div className="w-3/5 h-[552px] bg-customCardColor rounded-lg py-4">
//             <div className="flex justify-between items-center px-4">
//               <h1 className="font-lato text-base font-bold text-gray-700 mx-4 mb-2">Product Demand</h1>
//               <NextMonthlyForecast />
//             </div>
//             <Separator orientation="horizontal" className="bg-gray-300 mb-2 w-full" />
//             <ScrollArea className="h-[90%] px-8">
//               <Table id="productDemand" className="h-[85%] text-base font-lato">
              
//               <TableHeader>
//                 <TableRow className="font-bold">
//                   <TableHead className="font-semibold">Product ID</TableHead>
//                   <TableHead className="font-semibold">Product Name</TableHead>
//                   <TableHead className="font-semibold">Units Sold</TableHead>
//                 </TableRow>
//               </TableHeader>
              
//               <TableBody className="text-base" >
//                 {productDemandData.length > 0 ? (
//                   productDemandData.map(product => 
//                     product.Records.map(record => (
//                       <TableRow  key={`${product.ProductID}-${record.Month}`}>
//                         <TableCell className="font-medium">{product.ProductID}</TableCell>
//                         <TableCell>{record.Product}</TableCell>
//                         <TableCell>{record.UnitsSold}</TableCell>
//                       </TableRow>
//                     ))
//                   )
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={4} className="text-center">No data available</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
              
//             </Table>
//           </ScrollArea>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { axiosInstance } from "../services/axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import timeline from "../assets/Vertical Timeline.png";
import { ClipLoader } from "react-spinners";


type PredictedDemand = {
  Month: string;
  ProductID: string;
  Product: string;
  PredictedDemand: string;
}

interface SalesPrediction {
  prediction: string;
  next_month: string;
  percentage_increase: string;
}
export default function Insights() {
  const [productDemandPredictionData, setProductDemandPredictionData] = useState<PredictedDemand[]>([]);
  const [insights, setInsights] = useState("");
  const username = localStorage.getItem("username");
  const [salesPredictionData, setSalesPredictionData] = useState<SalesPrediction[]>([]);
  const [nextMonthName, setNextMonthName] = useState("");
  
  const [loading, setLoading] = useState(false);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  useEffect(() => {
    if (username) {
      axiosInstance.get(`/api/SalesPrediction/prediction`, {
        params: {
          username: username
        }
      })
        .then(response => {
          const salesData = response.data;
  
          // Assuming salesData contains a field like "next_month" in the format "1972-10"
          if (salesData && salesData.length > 0) {
            const monthNumber = salesData[0].next_month.split("-")[1]; // Extract the month number
            const monthIndex = parseInt(monthNumber, 10) - 1; // Convert month to 0-based index
            const monthName = monthNames[monthIndex]; // Get the month name
            
            setSalesPredictionData(salesData);
            setNextMonthName(monthName); // Save the month name in a useState
          }
        })
        .catch(error => {
          console.error("Error fetching sales prediction data: ", error);
        });
    }
  }, [username]);
  

  useEffect(() => {
    const fetchProductDemandPredictionData = async () => {
      if (username) {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`/api/DemandPrediction/prediction/${username}`);
          
          if (response.data) {
            const sortedData: PredictedDemand[] = response.data.sort((a: { PredictedDemand: number; }, b: { PredictedDemand: number; }) => b.PredictedDemand - a.PredictedDemand);
            setProductDemandPredictionData(sortedData);
          } else {
            console.error("No data received");
          }
        } catch (error) {
          console.error("Error fetching product demand prediction data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchProductDemandPredictionData();
  }, [username]);
  

  useEffect(() => {
    if (username) {
      setLoading(true);
      axiosInstance
        .get(`/api/Insight/${username}`, {
          headers: {
            "Content-Type": "application/json"
          },
        })
        .then((response) => {
          if (response.data.length > 0) {
            setInsights(response.data[0].InsightData);
          }
        })
        .catch((error) => {
          console.error("Error fetching forecast insights:", error);
        });
        setLoading(false);

          
    }
  }, [username]);

const exportToExcel = () => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Prepare Sales Prediction Data
  const salesSheetData = [["Prediction", "Next Month", "Percentage Increase"]];
  salesPredictionData.forEach(item => {
    salesSheetData.push([item.prediction, item.next_month, item.percentage_increase]);
  });
  const salesSheet = XLSX.utils.aoa_to_sheet(salesSheetData);

  // Apply text wrapping to Sales Prediction sheet
  Object.keys(salesSheet).forEach(key => {
    if (key[0] === '!') return; // Skip metadata keys
    salesSheet[key].s = {
      alignment: { wrapText: true }
    };
  });

  // Adjust column widths for Sales Prediction sheet
  const salesColumnWidths = [
    { wpx: Math.max(...salesSheetData.map(row => row[0].toString().length)) * 7 }, // Prediction
    { wpx: Math.max(...salesSheetData.map(row => row[1].toString().length)) * 7 }, // Next Month
    { wpx: Math.max(...salesSheetData.map(row => row[2].toString().length)) * 7 }  // Percentage Increase
  ];
  salesSheet['!cols'] = salesColumnWidths;

  XLSX.utils.book_append_sheet(workbook, salesSheet, "Sales Prediction");

  // Prepare Product Demand Prediction Data
  const productDemandSheetData = [["Product ID", "Product Name", "Projected Demand"]];
  productDemandPredictionData.forEach(item => {
    productDemandSheetData.push([item.ProductID, item.Product, item.PredictedDemand]);
  });
  const productDemandSheet = XLSX.utils.aoa_to_sheet(productDemandSheetData);

  // Apply text wrapping to Product Demand Prediction sheet
  Object.keys(productDemandSheet).forEach(key => {
    if (key[0] === '!') return; // Skip metadata keys
    productDemandSheet[key].s = {
      alignment: { wrapText: true }
    };
  });

  // Adjust column widths for Product Demand Prediction sheet
  const productDemandColumnWidths = [
    { wpx: Math.max(...productDemandSheetData.map(row => row[0].toString().length)) * 7 }, // Product ID
    { wpx: Math.max(...productDemandSheetData.map(row => row[1].toString().length)) * 7 }, // Product Name
    { wpx: Math.max(...productDemandSheetData.map(row => row[2].toString().length)) * 7 }  // Projected Demand
  ];
  productDemandSheet['!cols'] = productDemandColumnWidths;

  XLSX.utils.book_append_sheet(workbook, productDemandSheet, "Product Demand Prediction");

  // Prepare Insights Data
  const insightsSheetData = [["Insight Data"]];
  if (insights) {
    insightsSheetData.push([insights]);
  } else {
    insightsSheetData.push(["No insights available"]);
  }
  const insightsSheet = XLSX.utils.aoa_to_sheet(insightsSheetData);

  // Apply text wrapping to Insights sheet
  Object.keys(insightsSheet).forEach(key => {
    if (key[0] === '!') return; // Skip metadata keys
    insightsSheet[key].s = {
      alignment: { wrapText: true }
    };
  });

  // Adjust column widths for Insights sheet
  const insightsColumnWidths = insights ? [{ wpx: Math.max(insights.length, 20) * 7 }] : [{ wpx: 150 }]; // Default width if no insights
  insightsSheet['!cols'] = insightsColumnWidths;

  XLSX.utils.book_append_sheet(workbook, insightsSheet, "Insights");

  // Export the Excel file
  const excelFileName = "insights_data.xlsx";
  XLSX.writeFile(workbook, excelFileName);
};


  return (
    <div className="px-5 md:px-20 lg:px-20 xl:px-20 mb-8">
      <div className="flex my-5">
        <Button className="ml-auto" onClick={exportToExcel}>Export to Excel</Button>
      </div>


      <Card className="flex justify-between items-center w-full h-32 my-2 mb-5 bg-primary p-2 md:p-7 lg:p-7 xl:p-7">
        <div className="ml-5">
          <CardTitle className="font-lato text-customBackground font-thin text-[15px] md:text-base lg:text-base xl:text-base  w-fit">Forecasted Sales</CardTitle>
          <CardContent className="text-customBackground text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold font-lato p-0 mt-2 w-fit">
          PHP {salesPredictionData.length > 0 ? salesPredictionData[0].prediction : "No prediction data available"}
          </CardContent>
        </div>
        <div className="ml-auto p-0">
          <img src={timeline} height={110} width={110} alt="Timeline" />
        </div>
      </Card>

      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-5">
        <div className="flex flex-col md:w-2/5 lg:w-2/5 xl:w-2/5  gap-5">
          <div className="bg-customCardColor px-5 py-3 rounded-md">
            <h1 className="font-lato text-[14px] lg:text-base xl:text-base font-semibold text-gray-700 mx-2 mt-2 border-slate-300 border-b-[1px] pb-2">
              Next Month Forecast
            </h1>
            <div className="px-2 ">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm md:text-base font-semibold text-gray-700">Month</TableHead>
                    <TableHead className="text-sm md:text-base font-semibold text-gray-700" >Projected</TableHead>
                    <TableHead className="text-sm md:text-base font-semibold text-gray-700">% Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {salesPredictionData.length > 0 ? (
                      salesPredictionData.map((salesData, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-sm md:text-base">{nextMonthName}</TableCell>
                          <TableCell className="text-sm md:text-base">{salesData.prediction}</TableCell>
                          <TableCell className="text-sm md:text-base">{salesData.percentage_increase}%</TableCell>
                        </TableRow>
                      ))
                    ): (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">
                          No sales prediction data available
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="bg-customCardColor rounded-lg h-96 font-lato">
            <h1 className="font-lato text-base font-semibold text-gray-700 border-slate-300 border-b-[1px] mt-4 mx-7 mb-1 pb-1 w-auto">Forecast Insight</h1>
            
            <ScrollArea className="h-[85%] px-4">
              {loading ? (
                <div className="flex justify-center items-center h-[85%]">
                  <ClipLoader size={50} color="black" />
                </div>
              ) : (
                insights ? (
                  <div className="leading-7 md:leading-8 px-4 text-justify py-1 text-base font-lato">
                    {insights}
                  </div>
                ) : (
                  <p className="text-sm lg:text-base text-gray-500 mx-4">
                    No insights available at the moment.
                  </p>
                )
              )}
            </ScrollArea>
            
            
          </div>
        </div>

        <div className="md:w-3/5 lg:w-3/5 xl:w-3/5 h-[552px] bg-customCardColor rounded-lg py-4">
          <div className="flex justify-between items-center px-4">
            <h1 className="font-lato text-[14px] lg:text-base xl:text-base font-bold text-gray-700 border-slate-300 border-b-[1px] w-full mx-4 pb-2">
              Product Demand
            </h1>
          </div>
          <ScrollArea className="h-[90%] px-8">
  <Table id="productDemand" className="h-[85%] text-base font-lato">
    <TableHeader>
      <TableRow className="font-bold">
        <TableHead className="text-sm md:text-base font-semibold text-gray-500">Product ID</TableHead>
        <TableHead className="text-sm md:text-base font-semibold text-gray-500">Product Name</TableHead>
        <TableHead className="text-sm md:text-base font-semibold text-gray-500">Projected Demand</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className="text-base">
      {loading ? (
        <TableRow>
          <TableCell colSpan={3} className="text-center">
            <ClipLoader size={50} color="black" />
          </TableCell>
        </TableRow>
      ) : productDemandPredictionData.length > 0 ? (
        productDemandPredictionData.map((product, index) => (
          <TableRow key={`${product.ProductID}-${index}`}>
            <TableCell className="text-sm md:text-base">{product.ProductID}</TableCell>
            <TableCell className="text-sm md:text-base">{product.Product}</TableCell>
            <TableCell className="text-sm md:text-base">{product.PredictedDemand}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3} className="text-gray-500 text-center text-[14px] lg:text-base xl:text-base">
            No data available
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</ScrollArea>

        </div>
      </div>
    </div>
  );
}
