import { useState, useEffect, useRef } from "react";
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
  ProductID: string;
  Records: Record[]; // Updated to use the specific Record type
  Product: string;
  Month: string;
}

export const ProductGraphController = () => {
  const username = localStorage.getItem("username");
  const [products, setProducts] = useState<Product[]>([]);
  const [parsedData, setParsedData] = useState<ParsedData[]>([]);
  const [selectedProductID, setSelectedProductID] = useState("");
  const [selectedYears, setSelectedYears] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 
  // const [predictedDemandData, setPredictedDemandData] = useState([]);
  const [tickFormatter, setTickFormatter] = useState(() => (month : MonthNames) => monthsShort[month]);
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

  useEffect(() => {
    const updateTickFormatter = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) {
        setTickFormatter(() => (month: MonthNames) => monthsFull[month] || month);
      } else if (window.matchMedia("(min-width: 1024px)").matches) {
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


  

  // useEffect(() => {
  //   const fetchDemandPrediction = async () => {
  //     if (username) {
  //       try {
  //         const response = await axiosInstance.get(`/api/DemandPrediction/prediction/${username}`);
  //         const data = response.data; // Axios automatically parses the JSON response
  
  //         console.log(response.data, "hmm");
  
  //         // Parse the data into the desired format
  //         const formattedData = data.map((item: { Month: string; ProductID: any; PredictedDemand: any; }) => {
  //           const [year, monthIndex] = item.Month.split("-"); // Split month to get year and month index
  //           return {
  //             [item.ProductID]: item.PredictedDemand, // Dynamic key for ProductID
  //             month: getMonthName(parseInt(monthIndex) - 1), // Use the helper function
  //             year: parseInt(year), // Parse year as an integer
  //           };
  //         });
  
  //         // Log the formatted data for debugging
  //         console.log("Parsed Demand Prediction Data:", response.data);
  //         setPredictedDemandData(formattedData);
  //       } catch (error) {
  //         console.error("Error fetching demand prediction data:", error);
  //       }
  //     }
  //   };
    
  //   fetchDemandPrediction();
  // }, [username]);
  
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

  const finalData = formattedData.map((dataPoint) => {
    const filteredPoint: ParsedData = { month: dataPoint.month }; // Assign month as a number (1-12)
  
    latestYears.forEach((year) => {
      filteredPoint[year] = dataPoint[year] || 0; // Assign sales data by year
    });
  
    return filteredPoint;  // Return the filtered data point
  });

  setParsedData(finalData); // Update state with the final data
  console.log("final", finalData); // Log the final data
};
      
const combineParsedData = (parsedData: ParsedData[], predictedDemandData: any[]): ParsedData[] => {
  // Create a map for quick access to predicted demand values
  const predictedMap: { [key: string]: number } = {};

  // Populate the predictedMap with data from predictedDemandData
  predictedDemandData.forEach(item => {
    const [year, monthIndex] = item.month.split("-");
    const monthName = getMonthName(parseInt(monthIndex) - 1); // Convert index to month name
    const key = `${monthName}-${year}`; // Create a unique key for mapping
    predictedMap[key] = item.PredictedDemand; // Store predicted demand
  });

  // Combine parsedData with predicted data
  const combinedData: ParsedData[] = parsedData.map(data => {
    const combinedPoint: ParsedData = { month: data.month }; // Start with the existing month data

    const yearKeys = Object.keys(data).filter(key => key !== "month");
    yearKeys.forEach(year => {
      // Get the existing value, defaulting to 0 if not present
      const existingValue = data[year] as number || 0; // Ensure existing value is treated as a number
      const key = `${data.month}-${year}`; // Create the key for mapping
      
      // Add predicted demand if available
      combinedPoint[year] = existingValue + (predictedMap[key] || 0); // Ensure we are adding numbers only
    });

    return combinedPoint; // Return the combined data point
  });

  return combinedData; // Return the new combined data array
};


  // Use this function inside your useEffect that fetches the predicted demand data
  useEffect(() => {
    const fetchDemandPrediction = async () => {
      if (username) {
        try {
          const response = await axiosInstance.get(`/api/DemandPrediction/prediction/${username}`);
          const data = response.data; // Axios automatically parses the JSON response

          console.log(response.data, "hmm");

          // Parse the data into the desired format
          const formattedData = data.map((item: { Month: string; ProductID: string; PredictedDemand: number; }) => {
            const [year, monthIndex] = item.Month.split("-"); // Split month to get year and month index
            return {
              [item.ProductID]: item.PredictedDemand, // Dynamic key for ProductID
              month: getMonthName(parseInt(monthIndex) - 1), // Use the helper function
              year: parseInt(year), // Parse year as an integer
            };
          });

          // Combine with parsedData
          const updatedParsedData = combineParsedData(parsedData, formattedData);
          setParsedData(updatedParsedData);

          // Log the formatted data for debugging
          console.log("Combined Data:", updatedParsedData);
        } catch (error) {
          console.error("Error fetching demand prediction data:", error);
        }
      }
    };

    fetchDemandPrediction();
}, [username, parsedData]);

  const handleProductChange = (selectedID: string) => {
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

      
        pdf.setFontSize(8);
        pdf.text(`Exported by: ${username}`, textX + 20, textY + 40);
        pdf.text(`${selectedYears} Year/s Trend `, textX + 20, textY + 65);
        pdf.addImage(imgData, "PNG", margin, textY + 80, imgWidth, imgHeight);
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