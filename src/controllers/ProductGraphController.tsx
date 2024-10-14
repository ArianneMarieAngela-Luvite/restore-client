// import { useState, useEffect, useRef, SetStateAction } from "react";
// import { axiosInstance } from "../services/axios";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// interface Record {
//   Month: string; // Assuming this is the format "MM/DD/YYYY"
//   UnitsSold: number; // Assuming this is the number of units sold
// }
// interface Product {
//   ProductID: number;
//   Records: Record[]; // Updated to use the specific Record type
//   Product: string;
//   Month: string;
// }
// interface ParsedData {
//   month: number;
//   [key: string]: number | string; // Assuming year keys will be strings
// }
// interface MonthData {
//   month: string;
//   [year: string]: number | string; // Index signature for dynamic year properties
// }

// type MonthNames = "January" | "February" | "March" | "April" | "May" | "June" | 
//                   "July" | "August" | "September" | "October" | "November" | "December";


// export const ProductGraphController = () => {
//   const username = localStorage.getItem("username");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [parsedData, setParsedData] = useState<ParsedData[]>([]);
//   const [selectedProductID, setSelectedProductID] = useState<number | undefined>(undefined);
//   const [selectedYears, setSelectedYears] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const chartRef = useRef<HTMLDivElement>(null);


//   const monthsFull = {
//     January: "January",
//     February: "February",
//     March: "March",
//     April: "April",
//     May: "May",
//     June: "June",
//     July: "July",
//     August: "August",
//     September: "September",
//     October: "October",
//     November: "November",
//     December: "December",
//   };

//   const monthsShort = {
//     January: "Jan",
//     February: "Feb",
//     March: "Mar",
//     April: "Apr",
//     May: "May",
//     June: "Jun",
//     July: "Jul",
//     August: "Aug",
//     September: "Sep",
//     October: "Oct",
//     November: "Nov",
//     December: "Dec",
//   };

//   const monthsInitial = {
//     January: "J",
//     February: "F",
//     March: "M",
//     April: "A",
//     May: "M",
//     June: "J",
//     July: "J",
//     August: "A",
//     September: "S",
//     October: "O",
//     November: "N",
//     December: "D",
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

  
//   // const [tickFormatter, setTickFormatter] = useState(() => (month: MonthNames) => monthsShort[month]);
//   const [tickFormatter, setTickFormatter] = useState<(month: MonthNames) => string>(() => {
//     return (month: MonthNames) => monthsShort[month]; // Default formatter
//   });
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.matchMedia("(min-width: 1024px)").matches) {
//         setTickFormatter(() => (month: MonthNames) => monthsFull[month]); // Full name for lg and up
//       } else if (window.matchMedia("(min-width: 768px)").matches) {
//         setTickFormatter(() => (month: MonthNames) => monthsShort[month]); // First 3 letters for md
//       } else {
//         setTickFormatter(() => (month: MonthNames) => monthsInitial[month]); // First letter for sm and below
//       }
//     };

//     // Initial check and add event listener
//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);


//   // GET PRODUCT SALES DATA
//   useEffect(() => {
//     const fetchProductData = async () => {
//       setIsLoading(true);
//       if(username) {
//         try {
//           const response = await axiosInstance.get(`/api/Demand/demand/${username}`);
//           // const data = response.data;
//           const data: Product[] = response.data;
//           setProducts(data);
//           console.log(data[0].Records, "real");
//           if (data.length > 0) {
//             setSelectedProductID(data[0].ProductID);
//             updateParsedData(data[0].Records);
//           }
//         } catch (error) {
//           console.error("Error fetching product data:", error);
//         } finally {
//           setIsLoading(false); 
//         }
//       };
//     }
//     fetchProductData();
//   }, []);

//   // const itemList: Item[] = products.map(product => ({
//   //   value: product.ProductID.toString(), // Ensure this is a string
//   //   label: product.Product // or appropriate property
//   // }));



//   const updateParsedData = (records: any[]) => {
//     const salesDataByMonthAndYear: { [year: string]: number[] } = {}; // This will hold the sales data indexed by year

//   records.forEach((record: { Month: string; UnitsSold: string }) => {
//     const [month, , year] = record.Month.split("/");
//     const monthIndex = parseInt(month) - 1;

//     // Initialize the year array if it doesn't exist
//     if (!salesDataByMonthAndYear[year]) {
//       salesDataByMonthAndYear[year] = Array(12).fill(0);
//     }

//     // Sum the units sold for the given month and year
//     salesDataByMonthAndYear[year][monthIndex] += parseInt(record.UnitsSold);
//   });

//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December",
//   ];

//   const formattedData: MonthData[] = months.map((monthName, index) => {
//     const monthData: MonthData = { month: monthName }; // Create monthData with the month property

//     // Populate the monthData object with sales data for each year
//     Object.keys(salesDataByMonthAndYear).forEach((year) => {
//       monthData[year] = salesDataByMonthAndYear[year][index] || 0; // Use year as a dynamic key
//     });

//     return monthData; // Return the monthData object
//   });

//   const allYears = Object.keys(salesDataByMonthAndYear).sort();
//   const latestYears = allYears.slice(-selectedYears); // Get the latest years based on the selectedYears state

//   const finalData = formattedData.map((dataPoint, index) => {
//     const filteredPoint: ParsedData = { month: index + 1 }; // Assign month as a number (1-12)
  
//     latestYears.forEach((year) => {
//       filteredPoint[year] = dataPoint[year] || 0; // Assign sales data by year
//     });
  
//     return filteredPoint;  // Return the filtered data point
//   });

//   setParsedData(finalData); // Update state with the final data
//   console.log("final", finalData); // Log the final data
//   };

//   const handleProductChange = (selectedID: SetStateAction<number | undefined>) => {
//     const selectedProduct = products.find((product) => product.ProductID === selectedID);
//     if (selectedProduct) {
//       updateParsedData(selectedProduct.Records);
//       setSelectedProductID(selectedID);
//     }
//   };

//   // const handleProductChange = (selectedID: number) => {
//   //   const selectedProduct = products.find((product) => product.ProductID === selectedID);
//   //   if (selectedProduct) {
//   //     updateParsedData(selectedProduct.Records);
//   //     setSelectedProductID(selectedID);
//   //   }
//   // };


// //   const handleProductChange = (selectedID: string) => {
// //   const id = parseInt(selectedID); // Convert the string to a number
// //   const selectedProduct = products.find((product) => product.ProductID === id);
// //   if (selectedProduct) {
// //     updateParsedData(selectedProduct.Records);
// //     setSelectedProductID(id); // Update the selected product ID
// //   }
// // };

//   useEffect(() => {
//     const selectedProduct = products.find((product) => product.ProductID === selectedProductID);
//     if (selectedProduct) {
//       updateParsedData(selectedProduct.Records);
//     }
//   }, [selectedYears, selectedProductID, products]);

//   const getLatestYears = () => {
//     if (!parsedData || parsedData.length === 0) return [];
//     return Object.keys(parsedData[0]).filter(key => key !== "month");
//   };

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
//       pdf.text(`${selectedYears} Year/s Trend for`, textX + 15 , + 56);

//       pdf.addImage(imgData, "PNG", margin, textY + 30, imgWidth, imgHeight);
//       pdf.save("product_graph_forecast.pdf");
//     }
//   };

//   return {
//     products,
//     parsedData,
//     selectedYears,
//     selectedProductID,
//     isLoading,
//     yearColors,
//     chartRef,
//     monthsFull,
//     monthsShort,
//     monthsInitial,
//     tickFormatter,
//     handleProductChange,
//     setSelectedYears,
//     getLatestYears,
//     exportToPDF
//   };
// };

import { useState, useEffect, useRef, SetStateAction } from "react";
import { axiosInstance } from "../services/axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

type MonthNames = 
  "January" | "February" | "March" | "April" | "May" | "June" | 
  "July" | "August" | "September" | "October" | "November" | "December";

const monthNames: MonthNames[] = [
  "January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October",
  "November", "December"
];
interface ParsedData {
  month: string;
  [key: string]: number | string; // Assuming year keys will be strings
}
interface MonthData {
  month: string;
  [year: string]: number | string; // Index signature for dynamic year properties
}

interface Record {
  Month: string; // Assuming this is the format "MM/DD/YYYY"
  UnitsSold: number; // Assuming this is the number of units sold
}
interface Product {
  ProductID: number;
  Records: Record[]; // Updated to use the specific Record type
  Product: string;
  Month: string;
}

export const ProductGraphController = () => {
  const username = localStorage.getItem("username");
  // const [products, setProducts] = useState([]);
  const [products, setProducts] = useState<Product[]>([]);
  // const [parsedData, setParsedData] = useState([]);
  const [parsedData, setParsedData] = useState<ParsedData[]>([]);
  // const [selectedProductID, setSelectedProductID] = useState("");
  const [selectedProductID, setSelectedProductID] = useState<number | undefined>(undefined);
  const [selectedYears, setSelectedYears] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 
  const [predictedDemandData, setPredictedDemandData] = useState([]);
  const chartRef = useRef<HTMLDivElement>(null);

  const getMonthName = (index: number): MonthNames => monthNames[index];

  const monthsFull = {
    January: "January",
    February: "February",
    March: "March",
    April: "April",
    May: "May",
    June: "June",
    July: "July",
    August: "August",
    September: "September",
    October: "October",
    November: "November",
    December: "December",
  };
  const monthsShort = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };
  
  const monthsInitial = {
    January: "J",
    February: "F",
    March: "M",
    April: "A",
    May: "M",
    June: "J",
    July: "J",
    August: "A",
    September: "S",
    October: "O",
    November: "N",
    December: "D",
  };
  
  
  const yearColors = [
    "hsl(210, 80%, 60%)", // Blue
    "hsl(120, 80%, 60%)", // Green
    "hsl(0, 80%, 60%)",   // Red
    "hsl(60, 80%, 60%)",  // Yellow
    "hsl(300, 80%, 60%)", // Purple
    "hsl(30, 80%, 60%)",  // Orange
    "hsl(180, 80%, 60%)", // Teal
  ];


const [tickFormatter, setTickFormatter] = useState(() => (month : MonthNames) => monthsShort[month]);
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.matchMedia("(min-width: 1024px)").matches) {
  //       setTickFormatter(() => (month : MonthNames) => monthsFull[month] || month);
  //     } else if (window.matchMedia("(min-width: 768px)").matches) {
  //       setTickFormatter(() => (month : MonthNames) => monthsShort[month] || month);
  //     } else {
  //       setTickFormatter(() => (month : MonthNames) => monthsInitial[month] || month); 
  //     }
  //   };
    
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  useEffect(() => {
    const updateTickFormatter = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setTickFormatter(() => (month: MonthNames) => monthsFull[month] || month);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setTickFormatter(() => (month: MonthNames) => monthsShort[month] || month);
      } else {
        setTickFormatter(() => (month: MonthNames) => monthsInitial[month] || month);
      }
    };
  
    // Call it initially to set the correct formatter on first render
    updateTickFormatter();
  
    // Use the resize event to update formatter based on screen size
    window.addEventListener("resize", updateTickFormatter);
  
    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", updateTickFormatter);
  }, []);

  // GET PRODUCT SALES DATA
  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      if(username) {
        try {
          const response = await axiosInstance.get(`/api/Demand/demand/${username}`);
          const data = response.data;
          setProducts(data);
          console.log(data[0].Records, "real");
          if (data.length > 0) {
            setSelectedProductID(data[0].ProductID);
            updateParsedData(data[0].Records);
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        } finally {
          setIsLoading(false); 
        }
      };
    }
    fetchProductData();
  }, []);

  useEffect(() => {
    const fetchDemandPrediction = async () => {
      if (username) {
        try {
          const response = await axiosInstance.get(`/api/DemandPrediction/prediction/${username}`);
          const data = response.data; // Axios automatically parses the JSON response
  
          console.log(response.data, "hmm");
  
          // Parse the data into the desired format
          const formattedData = data.map((item: { Month: string; ProductID: any; PredictedDemand: any; }) => {
            const [year, monthIndex] = item.Month.split("-"); // Split month to get year and month index
            return {
              [item.ProductID]: item.PredictedDemand, // Dynamic key for ProductID
              month: getMonthName(parseInt(monthIndex) - 1), // Use the helper function
              year: parseInt(year), // Parse year as an integer
            };
          });
  
          // Log the formatted data for debugging
          console.log("Parsed Demand Prediction Data:", response.data);
          setPredictedDemandData(formattedData);
        } catch (error) {
          console.error("Error fetching demand prediction data:", error);
        }
      }
    };
    
    fetchDemandPrediction();
  }, [username]);
  
  // const updateParsedData = (records: any[]) => {
  //   const salesDataByMonthAndYear = {};
    
  //   records.forEach((record: { Month: { split: (arg0: string) => [any, any, any]; }; UnitsSold: string; }) => {
  //     const [month, , year] = record.Month.split("/");
  //     const monthIndex = parseInt(month) - 1;
  //     if (!salesDataByMonthAndYear[year]) {
  //       salesDataByMonthAndYear[year] = Array(12).fill(0);
  //     }
  //     salesDataByMonthAndYear[year][monthIndex] += parseInt(record.UnitsSold);
  //   });
  //   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //   const formattedData = months.map((monthName, index) => {
  //     const monthData = { month: monthName };
  //     Object.keys(salesDataByMonthAndYear).forEach((year) => {
  //       monthData[year] = salesDataByMonthAndYear[year][index] || 0;
  //     });
  //     return monthData;
  //   });
  //   const allYears = Object.keys(salesDataByMonthAndYear).sort();
  //   const latestYears = allYears.slice(-selectedYears);
  //   const finalData = formattedData.map((dataPoint) => {
  //     const filteredPoint = { month: dataPoint.month };
  //     latestYears.forEach((year) => {
  //       filteredPoint[year] = dataPoint[year] || 0;
  //     });
  //     return filteredPoint;
  //   });
  //   setParsedData(finalData);
  //   console.log("final", finalData);
  // };


  const updateParsedData = (records: any[]) => {
        const salesDataByMonthAndYear: { [year: string]: number[] } = {}; // This will hold the sales data indexed by year
    
      records.forEach((record: { Month: string; UnitsSold: string }) => {
        const [month, , year] = record.Month.split("/");
        const monthIndex = parseInt(month) - 1;
    
        // Initialize the year array if it doesn't exist
        if (!salesDataByMonthAndYear[year]) {
          salesDataByMonthAndYear[year] = Array(12).fill(0);
        }
    
        // Sum the units sold for the given month and year
        salesDataByMonthAndYear[year][monthIndex] += parseInt(record.UnitsSold);
      });
    
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ];
    
      const formattedData: MonthData[] = months.map((monthName, index) => {
        const monthData: MonthData = { month: monthName }; // Create monthData with the month property
    
        // Populate the monthData object with sales data for each year
        Object.keys(salesDataByMonthAndYear).forEach((year) => {
          monthData[year] = salesDataByMonthAndYear[year][index] || 0; // Use year as a dynamic key
        });
    
        return monthData; // Return the monthData object
      });
    
      const allYears = Object.keys(salesDataByMonthAndYear).sort();
      const latestYears = allYears.slice(-selectedYears); // Get the latest years based on the selectedYears state
    
      const finalData = formattedData.map((dataPoint, index) => {
        const filteredPoint: ParsedData = { month: dataPoint.month }; // Assign month as a number (1-12)
      
        latestYears.forEach((year) => {
          filteredPoint[year] = dataPoint[year] || 0; // Assign sales data by year
        });
      
        return filteredPoint;  // Return the filtered data point
      });
    
      setParsedData(finalData); // Update state with the final data
      console.log("final", finalData); // Log the final data
      };
    

  const handleProductChange = (selectedID: number) => {
    const selectedProduct = products.find((product) => product.ProductID === selectedID);
    if (selectedProduct) {
      updateParsedData(selectedProduct.Records);
      setSelectedProductID(selectedID);
    }
  };

  useEffect(() => {
    const selectedProduct = products.find((product) => product.ProductID === selectedProductID);
    if (selectedProduct) {
      updateParsedData(selectedProduct.Records);
    }
  }, [selectedYears, selectedProductID, products]);
  const getLatestYears = () => {
    if (!parsedData || parsedData.length === 0) return [];
    return Object.keys(parsedData[0]).filter(key => key !== "month");
  };

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
      pdf.setFontSize(16);
      pdf.text(`${selectedYears} Trend`, textX, textY);
      pdf.addImage(imgData, "PNG", margin, textY + 20, imgWidth, imgHeight);
      pdf.save("product_graph_forecast.pdf");
    }
  };
  return {
    products,
    parsedData,
    selectedYears,
    selectedProductID,
    isLoading,
    yearColors,
    chartRef,
    monthsFull,
    monthsShort,
    monthsInitial,
    tickFormatter,
    handleProductChange,
    setSelectedYears,
    getLatestYears,
    exportToPDF
  };
};