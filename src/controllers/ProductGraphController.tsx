import { useState, useEffect, useRef, SetStateAction } from "react";
import { axiosInstance } from "../services/axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


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

interface ParsedData {
  month: number;
  [key: string]: number | string; // Assuming year keys will be strings
}

// interface SalesDataByMonth {
//   [monthIndex: number]: number; // Array of units sold for each month
// }

// interface SalesDataByYear {
//   [year: string]: SalesDataByMonth; // Object with year as key and sales data as value
// }

interface MonthData {
  month: string;
  [year: string]: number | string; // Index signature for dynamic year properties
}

// interface ComboboxDemoProps {
//   items: Product[]; // Ensure this type matches your product data
//   onSelect: (selectedID: number | string) => void; // Adjust based on your implementation
// }
type MonthNames = "January" | "February" | "March" | "April" | "May" | "June" | 
                  "July" | "August" | "September" | "October" | "November" | "December";


export const ProductGraphController = () => {
  const username = localStorage.getItem("username");
  const [products, setProducts] = useState<Product[]>([]);
  const [parsedData, setParsedData] = useState<ParsedData[]>([]);
  const [selectedProductID, setSelectedProductID] = useState<number | undefined>(undefined);
  const [selectedYears, setSelectedYears] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);

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

  const [tickFormatter, setTickFormatter] = useState(() => (month: MonthNames) => monthsShort[month]);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setTickFormatter(() => (month: MonthNames) => monthsFull[month]); // Full name for lg and up
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setTickFormatter(() => (month: MonthNames) => monthsShort[month]); // First 3 letters for md
      } else {
        setTickFormatter(() => (month: MonthNames) => monthsInitial[month]); // First letter for sm and below
      }
    };
  
    // Initial check and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // GET PRODUCT SALES DATA
  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      if(username) {
        try {
          const response = await axiosInstance.get(`/api/Demand/demand/${username}`);
          // const data = response.data;
          const data: Product[] = response.data;
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
    const filteredPoint: ParsedData = { month: index + 1 }; // Assign month as a number (1-12)
  
    latestYears.forEach((year) => {
      filteredPoint[year] = dataPoint[year] || 0; // Assign sales data by year
    });
  
    return filteredPoint;  // Return the filtered data point
  });

  setParsedData(finalData); // Update state with the final data
  console.log("final", finalData); // Log the final data
  };

  const handleProductChange = (selectedID: SetStateAction<number | undefined>) => {
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
      pdf.text(`Exported by: ${username}`, textX + 15, textY)
      pdf.text(`${selectedYears} Year/s Trend for`, textX + 15 , + 56);

      pdf.addImage(imgData, "PNG", margin, textY + 30, imgWidth, imgHeight);
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
