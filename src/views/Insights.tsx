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
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import timeline from "../assets/Vertical Timeline.png";
import { ClipLoader } from "react-spinners";

export default function Insights() {
  const [productDemandPredictionData, setProductDemandPredictionData] = useState([]);
  const [insights, setInsights] = useState("");
  const username = localStorage.getItem("username");
  const [salesPredictionData, setSalesPredictionData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock Sales data for now
  const sales = "₱14,324.53";

  useEffect(() => {
    if (username) {
      axiosInstance.get(`/api/SalesPrediction/prediction`, {
        params: {
          username: username
        }
      })
        .then(response => {
          setSalesPredictionData(response.data);
          
        })
        .catch(error => {
          console.error("Error fetching sales prediction data: ", error);
        });
    }
  }, [username]);
  
  useEffect(() => {
    const fetchProductDemandPredictionData = async () => {
      if (username) {// Start loading
        try {
          const response = await axiosInstance.get(`/api/DemandPrediction/prediction/${username}`);
          if (response.data) {
            // setProductDemandPredictionData(response.data);
            const sortedData = response.data.sort((a, b) => b.PredictedDemand - a.PredictedDemand);
            setProductDemandPredictionData(sortedData);
          } else {
            console.error("No data received");
          }
        } catch (error) {
          console.error("Error fetching product demand prediction data:", error);
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
    const workbook = XLSX.utils.book_new();

    // 1. Create Product Demand Data Sheet
    const productDemandSheetData = [["Product ID", "Product Name", "Units Sold"]];
    productDemandData.forEach(product => {
      product.Records.forEach(record => {
        productDemandSheetData.push([product.ProductID, record.Product, record.UnitsSold]);
      });
    });
    const productDemandSheet = XLSX.utils.aoa_to_sheet(productDemandSheetData);
    XLSX.utils.book_append_sheet(workbook, productDemandSheet, "Product Demand");

    // 2. Create Forecast Insight Sheet
    const insightSheetData = [["Insight"]];
    insightSheetData.push([insights]);
    const insightSheet = XLSX.utils.aoa_to_sheet(insightSheetData);
    XLSX.utils.book_append_sheet(workbook, insightSheet, "Forecast Insights");

    // 3. Create Mock Data for Next Monthly Forecast Sheet (Replace with actual data if available)
    const forecastSheetData = [
      ["Invoice", "Status", "Method", "Amount"],
      ["INV001", "Paid", "Credit Card", "$250.00"],
    ];
    const forecastSheet = XLSX.utils.aoa_to_sheet(forecastSheetData);
    XLSX.utils.book_append_sheet(workbook, forecastSheet, "Next Monthly Forecast");

    // Export the file
    XLSX.writeFile(workbook, "Insights_Data.xlsx");
  };

  return (
    <div className="px-10 md:px-20 lg:px-20 xl:px-20 mb-8">
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
            {/* <Separator orientation="horizontal" className="bg-gray-300 h-[1px] mb-2 mx-2 w-[97%]" /> */}
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
                          <TableCell className="text-sm md:text-base">{salesData.next_month}</TableCell>
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
            {/* <Separator orientation="horizontal" className="bg-gray-300 mb-2 w-[94%] mx-4 h-[1px]" /> */}
            <ScrollArea className="h-[85%] px-4">
              {insights ? (
                <div className="leading-7 md:leading-8  px-4 text-justify py-1 text-base font-lato">
                  {insights}
                </div>
              ) : (
                <p className="text-sm lg:text-base text-gray-500 mx-4">No insights available at the moment.</p>
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
          {/* <Separator orientation="horizontal" className="bg-gray-300 mb-2 lg:w-[92%] w-[85%] ml-6  lg:ml-8 h-[1px] items-center " /> */}
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
        {loading ? ( // Show spinner while loading
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
