// import { useEffect, useState, useRef } from "react";
// import { axiosInstance } from "../services/axios"; // Adjust the path as needed
// import html2canvas from "html2canvas"; // Import html2canvas
// import { jsPDF } from "jspdf"; // Import jsPDF

// interface SalesPrediction {
//   prediction: string;
//   next_month: string;
//   percentage_increase: string;
// }
// interface ParsedData {
//   month: string;
//   [key: string]: any
// }
// export function SalesGraphController() {
//   const username = localStorage.getItem("username");
//   const [parsedData, setParsedData] = useState([]);
//   const [selectedYears, setSelectedYears] = useState(1);
//   const [allYears, setAllYears] = useState<number[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [salesPredictionData, setSalesPredictionData] = useState<SalesPrediction[]>([]);
//   const chartRef = useRef<HTMLDivElement>(null);

// useEffect(() => {
//   const fetchSalesData = async () => {
//     setIsLoading(true);
//     if (!username) {
//       console.error("Username not found in local storage.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(`/api/Sales/sales/${username}`);
//       const salesData = JSON.parse(response.data.data);
//       handleParsedData(salesData.data);
//     } catch (err) {
//       console.error("Failed to fetch sales data:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchSalesData();
// }, [username]);

// // Fetch sales prediction data
// useEffect(() => {
//   if (username) {
//     axiosInstance.get(`/api/SalesPrediction/prediction`, {
//       params: { username: username }
//     })
//       .then(response => {
//         setSalesPredictionData(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching sales prediction data: ", error);
//       });
//   }
// }, [username]);

// // Combine sales and prediction data only when both are available
// useEffect(() => {
//   if (parsedData && salesPredictionData && parsedData.length > 0 && salesPredictionData.length > 0) {
//     combinePredictionData();
//   }
// }, [parsedData, salesPredictionData]); // Watch both parsedData and salesPredictionData

// const combinePredictionData = () => {
//   if (!parsedData || !salesPredictionData) {
//     console.log("Missing data: parsedData or salesPredictionData is not available");
//     return;
//   }

//   // Debugging: Ensure we have data before proceeding
//   console.log("parsedData before combining:", parsedData);
//   console.log("salesPredictionData:", salesPredictionData);

//   // Deep copy of parsedData to avoid mutating original state
//   const combinedDataMap = parsedData.map(entry => ({ ...entry }));

//   console.log("combi before prediction", combinedDataMap);

//   // Iterate through sales prediction data
//   salesPredictionData.forEach((prediction) => {
//     const [year, month] = prediction.next_month.split('-'); // Split next_month into year and month
//     const predictionSales = parseFloat(prediction.prediction); // Parse prediction sales as a number
//     const monthName = getMonthNameFromNumber(month); // Convert month number to month name

//     // Find the corresponding month in parsedData
//     const existingMonthEntry = combinedDataMap.find(entry => entry.month === monthName);

//     if (existingMonthEntry) {
//       // Add prediction for the given year without overwriting other years
//       console.log(`Adding prediction for year ${year} in month ${monthName}`);
//       existingMonthEntry[year] = predictionSales;
//     } else {
//       // Create a new entry if the month does not exist in parsedData
//       console.log(`Creating new entry for month ${monthName} with prediction for year ${year}`);
//       combinedDataMap.push({
//         month: monthName,
//         [year]: predictionSales
//       });
//     }
//   });

//   console.log("combi after prediction", combinedDataMap);

//   // Update the state with the combined data
//   setParsedData(combinedDataMap);
//   console.log("Final Combined data", combinedDataMap);
// };

// // Format sales data
// const handleParsedData = (data: any) => {
//   const formattedDataMap = {};
//   const yearsSet = new Set();

//   for (const entry of data) {
//     const year = entry.Year;
//     const salesData = entry.SalesData;
//     yearsSet.add(year);

//     for (const monthData of salesData) {
//       const month = monthData.Month;

//       if (!formattedDataMap[month]) {
//         formattedDataMap[month] = { month };
//       }

//       formattedDataMap[month][year] = monthData.Sales;
//     }
//   }

//   const formattedDataArray = Object.values(formattedDataMap);
//   const sortedYears = Array.from(yearsSet).sort((a : number, b) => b - a);

//   setParsedData(formattedDataArray);
//   console.log("formatted", formattedDataArray);
//   setAllYears(sortedYears);
//   console.log("year", sortedYears);
// };

// // Helper function to map month number to month name
// const getMonthNameFromNumber = (monthNumber: string) => {
//   const months = [
//     "January", "February", "March", "April", "May", "June", 
//     "July", "August", "September", "October", "November", "December"
//   ];
//   return months[parseInt(monthNumber) - 1];
// };


//   // Get the latest N years from the parsed data
//   const getLatestYears = () => {
//     return allYears.slice(0, selectedYears).sort((a, b) => b - a);
//   };

//   // Export chart to PDF
//   const exportToPDF = async () => {
//     if (chartRef.current) {
//       const canvas = await html2canvas(chartRef.current, { scale: 0.75 });
//       const imgData = canvas.toDataURL("image/png", 0.75);

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
//       pdf.setFontSize(8);
//       pdf.text(`Exported by: ${username}`, textX + 15, textY)
//       pdf.text(`${selectedYears} Year/s Trend`, textX + 15 , + 56);

//       pdf.addImage(imgData, "PNG", margin, textY + 30, imgWidth, imgHeight);

//       pdf.save("sales_graph_forecast.pdf");
//     }
//   };

//   return {
//     parsedData,
//     selectedYears,
//     allYears,
//     setSelectedYears,
//     getLatestYears,
//     isLoading,
//     exportToPDF,
//     chartRef,
//     salesPredictionData
//   };
// }


import { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../services/axios"; // Adjust the path as needed
import html2canvas from "html2canvas"; // Import html2canvas
import { jsPDF } from "jspdf"; // Import jsPDF

interface SalesPrediction {
  prediction: string;
  next_month: string;
  percentage_increase: string;
}
interface ParsedData {
  month: string;
  [key: string]: any;
}

export function SalesGraphController() {
  const username = localStorage.getItem("username");
  const [parsedData, setParsedData] = useState<ParsedData[]>([]);
  const [selectedYears, setSelectedYears] = useState(1);
  const [allYears, setAllYears] = useState<number[]>([]); // Explicitly type as number[]
  const [isLoading, setIsLoading] = useState(true);
  const [salesPredictionData, setSalesPredictionData] = useState<SalesPrediction[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      setIsLoading(true);
      if (!username) {
        console.error("Username not found in local storage.");
        return;
      }

      try {
        const response = await axiosInstance.get(`/api/Sales/sales/${username}`);
        const salesData = JSON.parse(response.data.data);
        handleParsedData(salesData.data);
      } catch (err) {
        console.error("Failed to fetch sales data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, [username]);

  // Fetch sales prediction data
  useEffect(() => {
    if (username) {
      axiosInstance.get(`/api/SalesPrediction/prediction`, {
        params: { username: username }
      })
        .then(response => {
          setSalesPredictionData(response.data);
        })
        .catch(error => {
          console.error("Error fetching sales prediction data: ", error);
        });
    }
  }, [username]);

  // Combine sales and prediction data only when both are available
  useEffect(() => {
    if (parsedData && salesPredictionData && parsedData.length > 0 && salesPredictionData.length > 0) {
      combinePredictionData();
    }
  }, [parsedData, salesPredictionData]); // Watch both parsedData and salesPredictionData

  const combinePredictionData = () => {
    if (!parsedData || !salesPredictionData) {
      console.log("Missing data: parsedData or salesPredictionData is not available");
      return;
    }

    // Debugging: Ensure we have data before proceeding
    console.log("parsedData before combining:", parsedData);
    console.log("salesPredictionData:", salesPredictionData);

    // Deep copy of parsedData to avoid mutating original state
    const combinedDataMap = parsedData.map(entry => ({ ...entry }));

    console.log("combi before prediction", combinedDataMap);

    // Iterate through sales prediction data
    salesPredictionData.forEach((prediction) => {
      const [year, month] = prediction.next_month.split('-'); // Split next_month into year and month
      const predictionSales = parseFloat(prediction.prediction); // Parse prediction sales as a number
      const monthName = getMonthNameFromNumber(month); // Convert month number to month name

      // Find the corresponding month in parsedData
      const existingMonthEntry = combinedDataMap.find(entry => entry.month === monthName);

      if (existingMonthEntry) {
        // Add prediction for the given year without overwriting other years
        console.log(`Adding prediction for year ${year} in month ${monthName}`);
        existingMonthEntry[year] = predictionSales;
      } else {
        // Create a new entry if the month does not exist in parsedData
        console.log(`Creating new entry for month ${monthName} with prediction for year ${year}`);
        combinedDataMap.push({
          month: monthName,
          [year]: predictionSales
        });
      }
    });

    console.log("combi after prediction", combinedDataMap);

    // Update the state with the combined data
    setParsedData(combinedDataMap);
    console.log("Final Combined data", combinedDataMap);
  };

  // Format sales data
  const handleParsedData = (data: any) => {
    const formattedDataMap: { [key: string]: ParsedData } = {};
    const yearsSet = new Set<number>(); // Use Set<number> to store years

    for (const entry of data) {
      const year = entry.Year;
      const salesData = entry.SalesData;
      yearsSet.add(year);

      for (const monthData of salesData) {
        const month = monthData.Month;

        if (!formattedDataMap[month]) {
          formattedDataMap[month] = { month };
        }

        formattedDataMap[month][year] = monthData.Sales;
      }
    }

    const formattedDataArray = Object.values(formattedDataMap);
    const sortedYears = Array.from(yearsSet).sort((a, b) => b - a);

    setParsedData(formattedDataArray);
    console.log("formatted", formattedDataArray);
    setAllYears(sortedYears);
    console.log("year", sortedYears);
  };

  // Helper function to map month number to month name
  const getMonthNameFromNumber = (monthNumber: string) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[parseInt(monthNumber) - 1];
  };

  // Get the latest N years from the parsed data
  const getLatestYears = () => {
    return allYears.slice(0, selectedYears).sort((a, b) => b - a);
  };

  // Export chart to PDF
  const exportToPDF = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, { scale: 0.75 });
      const imgData = canvas.toDataURL("image/png", 0.75);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792],
      });

      const margin = 36;
      const imgWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const textX = margin;
      const textY = margin;
      pdf.setFontSize(8);
      pdf.text(`Exported by: ${username}`, textX + 15, textY);
      pdf.text(`${selectedYears} Year/s Trend`, textX + 15, textY + 56);

      pdf.addImage(imgData, "PNG", margin, textY + 30, imgWidth, imgHeight);

      pdf.save("sales_graph_forecast.pdf");
    }
  };

  return {
    parsedData,
    selectedYears,
    allYears,
    setSelectedYears,
    getLatestYears,
    isLoading,
    exportToPDF,
    chartRef,
    salesPredictionData
  };
}
