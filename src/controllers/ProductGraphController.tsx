import { useState, useEffect, useRef } from "react";
import { axiosInstance } from "../services/axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const ProductGraphController = () => {
  const username = localStorage.getItem("username");
  const [products, setProducts] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [selectedProductID, setSelectedProductID] = useState("");
  const [selectedYears, setSelectedYears] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 
  const [predictedDemandData, setPredictedDemandData] = useState([]);
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

  const [tickFormatter, setTickFormatter] = useState(() => (month) => monthsShort[month] || month);
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setTickFormatter(() => (month) => monthsFull[month] || month); // Full name for lg and up
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setTickFormatter(() => (month) => monthsShort[month] || month); // First 3 letters for md
      } else {
        setTickFormatter(() => (month) => monthsInitial[month] || month); // First letter for sm and below
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

   // Fetch Demand Prediction and parse data
   useEffect(() => {
    const fetchDemandPrediction = async () => {
      try {
        const response = await fetch(`/api/Demand/DemandPrediction/prediction/${username}`);
        const data = await response.json();

        // Parse the data into the desired format
        const formattedData = data.map(item => {
          const [year, monthIndex] = item.Month.split("-"); // Split month to get year and month index
          const monthNames = [
            "January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October",
            "November", "December"
          ];
          const monthName = monthNames[parseInt(monthIndex) - 1]; // Convert index to month name

          // Construct the object in the required format
          return {
            [item.ProductID]: item.PredictedDemand, // Dynamic key for ProductID
            month: monthName,
            year: parseInt(year) // Parse year as an integer
          };
        });

        // Log the formatted data for debugging
        console.log("Parsed Demand Prediction Data:", formattedData);
        setPredictedDemandData(formattedData);
      } catch (error) {
        console.error("Error fetching demand prediction data:", error);
      }
    };

    fetchDemandPrediction();
  }, [username]);



  const updateParsedData = (records) => {
    const salesDataByMonthAndYear = {};

    records.forEach((record) => {
      const [month, , year] = record.Month.split("/");
      const monthIndex = parseInt(month) - 1;

      if (!salesDataByMonthAndYear[year]) {
        salesDataByMonthAndYear[year] = Array(12).fill(0);
      }
      salesDataByMonthAndYear[year][monthIndex] += parseInt(record.UnitsSold);
    });

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedData = months.map((monthName, index) => {
      const monthData = { month: monthName };

      Object.keys(salesDataByMonthAndYear).forEach((year) => {
        monthData[year] = salesDataByMonthAndYear[year][index] || 0;
      });

      return monthData;
    });

    const allYears = Object.keys(salesDataByMonthAndYear).sort();
    const latestYears = allYears.slice(-selectedYears);

    const finalData = formattedData.map((dataPoint) => {
      const filteredPoint = { month: dataPoint.month };
      latestYears.forEach((year) => {
        filteredPoint[year] = dataPoint[year] || 0;
      });
      return filteredPoint;
    });

    setParsedData(finalData);
    console.log("final", finalData);
  };

  const handleProductChange = (selectedID) => {
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
