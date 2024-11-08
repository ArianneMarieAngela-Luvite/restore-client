import { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../services/axios";
import html2canvas from "html2canvas"; 
import { jsPDF } from "jspdf"; 

interface SalesPrediction {
  prediction: string;
  next_month: string;
  percentage_increase: string;
}
interface ParsedData {
  month: string;
  [key: string]: any;
}

type MonthNames = "January" | "February" | "March" | "April" | "May" | "June" | 
                  "July" | "August" | "September" | "October" | "November" | "December";

export function SalesGraphController() {
  const username = localStorage.getItem("username");
  const [parsedData, setParsedData] = useState<ParsedData[]>([]);
  const [selectedYears, setSelectedYears] = useState(1);
  const [allYears, setAllYears] = useState<number[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [salesPredictionData, setSalesPredictionData] = useState<SalesPrediction[]>([]);
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

  const [tickFormatter, setTickFormatter] = useState<(month: MonthNames) => string>(() => {
    return (month: MonthNames) => monthsShort[month]; 
  });
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) {
        setTickFormatter(() => (month: MonthNames) => monthsFull[month]); 
      } else if (window.matchMedia("(min-width: 1024px)").matches) {
        setTickFormatter(() => (month: MonthNames) => monthsShort[month]); 
      } else {
        setTickFormatter(() => (month: MonthNames) => monthsInitial[month]); 
      }
    };

    
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSalesData = async () => {
      setIsLoading(true);
      if (!username) {
        console.error("Username not found in local storage.");
        return;
      }

      try {
        const response = await axiosInstance.get(`/api/Sales/sales/`, {
          params: { username: username }
        });
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

 
  useEffect(() => {
    if (parsedData && salesPredictionData && parsedData.length > 0 && salesPredictionData.length > 0) {
      combinePredictionData();
    }
  }, [parsedData, salesPredictionData]); 

  const combinePredictionData = () => {
    if (!parsedData || !salesPredictionData) {
      // console.log("Missing data: parsedData or salesPredictionData is not available");
      return;
    }
    const combinedDataMap = parsedData.map(entry => ({ ...entry }));
    
    salesPredictionData.forEach((prediction) => {
      const [year, month] = prediction.next_month.split('-'); 
      const predictionSales = parseFloat(prediction.prediction); 
      const monthName = getMonthNameFromNumber(month); 

     
      const existingMonthEntry = combinedDataMap.find(entry => entry.month === monthName);

      if (existingMonthEntry) {
        existingMonthEntry[year] = predictionSales;
      } else {
        combinedDataMap.push({
          month: monthName,
          [year]: predictionSales
        });
      }
    });
    setParsedData(combinedDataMap);
  };

  
  const handleParsedData = (data: any) => {
    const formattedDataMap: { [key: string]: ParsedData } = {};
    const yearsSet = new Set<number>(); 

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
    setAllYears(sortedYears);
  };


  const getMonthNameFromNumber = (monthNumber: string) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[parseInt(monthNumber) - 1];
  };

  
  const getLatestYears = () => {
    return allYears.slice(0, selectedYears).sort((a, b) => b - a);
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
      pdf.text(`${selectedYears} Year/s Trend`, textX + 20, textY + 56);

      pdf.addImage(imgData, "PNG", margin, textY + 60, imgWidth, imgHeight);

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
    salesPredictionData,
    tickFormatter
  };
}
