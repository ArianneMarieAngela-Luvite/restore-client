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
  [key: string]: number | string; 
}
interface MonthData {
  month: string;
  [year: string]: number | string; 
}

interface Record {
  Month: string; 
  UnitsSold: number; 
}
interface Product {
  ProductID: string;
  Records: Record[]; 
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
  
    
    updateTickFormatter();
  
    
    window.addEventListener("resize", updateTickFormatter);
  
    
    return () => window.removeEventListener("resize", updateTickFormatter);
  }, []);

  
  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      if(username) {
        try {
          const response = await axiosInstance.get(`/api/Demand/demand/`, {
            params: { username: username }
          });
          const data = response.data;
          setProducts(data);
          // console.log(data[0].Records, "real");
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
    const salesDataByMonthAndYear: { [year: string]: number[] } = {}; 

  records.forEach((record: { Month: string; UnitsSold: string }) => {
    const [month, , year] = record.Month.split("/");
    const monthIndex = parseInt(month) - 1;

    
    if (!salesDataByMonthAndYear[year]) {
      salesDataByMonthAndYear[year] = Array(12).fill(0);
    }

    
    salesDataByMonthAndYear[year][monthIndex] += parseInt(record.UnitsSold);
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const formattedData: MonthData[] = months.map((monthName, index) => {
    const monthData: MonthData = { month: monthName }; 

    
    Object.keys(salesDataByMonthAndYear).forEach((year) => {
      monthData[year] = salesDataByMonthAndYear[year][index] || 0;
    });

    return monthData; 
  });

  const allYears = Object.keys(salesDataByMonthAndYear).sort();
  const latestYears = allYears.slice(-selectedYears); 

  const finalData = formattedData.map((dataPoint) => {
    const filteredPoint: ParsedData = { month: dataPoint.month }; 
  
    latestYears.forEach((year) => {
      filteredPoint[year] = dataPoint[year] || 0; 
    });
  
    return filteredPoint;  
  });

  setParsedData(finalData); 
  // console.log("final", finalData);
};
      
const combineParsedData = (parsedData: ParsedData[], predictedDemandData: any[]): ParsedData[] => {
  
  const predictedMap: { [key: string]: number } = {};

  
  predictedDemandData.forEach(item => {
    const [year, monthIndex] = item.month.split("-");
    const monthName = getMonthName(parseInt(monthIndex) - 1); 
    const key = `${monthName}-${year}`; 
    predictedMap[key] = item.PredictedDemand; 
  });

  
  const combinedData: ParsedData[] = parsedData.map(data => {
    const combinedPoint: ParsedData = { month: data.month }; 

    const yearKeys = Object.keys(data).filter(key => key !== "month");
    yearKeys.forEach(year => {
      
      const existingValue = data[year] as number || 0; 
      const key = `${data.month}-${year}`; 
      
      
      combinedPoint[year] = existingValue + (predictedMap[key] || 0); 
    });

    return combinedPoint; 
  });

  return combinedData; 
};



  useEffect(() => {
    const fetchDemandPrediction = async () => {
      if (username) {
        try {
          const response = await axiosInstance.get(`/api/DemandPrediction/prediction/${username}`);
          const data = response.data; 

          // console.log(response.data, "hmm");

          
          const formattedData = data.map((item: { Month: string; ProductID: string; PredictedDemand: number; }) => {
            const [year, monthIndex] = item.Month.split("-"); 
            return {
              [item.ProductID]: item.PredictedDemand, 
              month: getMonthName(parseInt(monthIndex) - 1),
              year: parseInt(year), 
            };
          });

          
          const updatedParsedData = combineParsedData(parsedData, formattedData);
          setParsedData(updatedParsedData);

          
          // console.log("Combined Data:", updatedParsedData);
        } catch (error) {
          console.error("Error fetching demand prediction data:", error);
        }
      }
    };

    fetchDemandPrediction();
}, []);

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