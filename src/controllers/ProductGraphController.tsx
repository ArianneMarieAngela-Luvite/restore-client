import { useState, useEffect, useRef } from "react";
import { axiosInstance } from "../services/axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

type MonthNames = 
  "January" | "February" | "March" | "April" | "May" | "June" | 
  "July" | "August" | "September" | "October" | "November" | "December";

// const monthNames: MonthNames[] = [
//   "January", "February", "March", "April", "May",
//   "June", "July", "August", "September", "October",
//   "November", "December"
// ];
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

interface Prediction {
  Month: string; // "2030-01"
  ProductID: number; // Product ID
  Product: string; // Product name
  PredictedDemand: number; // Predicted demand for that product
}


interface Product {
  ProductID: string; 
  Product: string; 
  Month: string; 
  Records: Record[]; 
}

// interface FormattedPrediction {
//   Month: string; // The month string, such as "January"
//   YearPredictions: { [year: string]: number }; // Map of year to predicted demand
// }




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

  // const getMonthName = (index: number): MonthNames => monthNames[index];

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

  
  // useEffect(() => {
  //   const fetchProductData = async () => {
  //     setIsLoading(true);
  //     if(username) {
  //       try {
  //         const response = await axiosInstance.get(`/api/Demand/demand/`, {
  //           params: { username: username }
  //         });
  //         const data = response.data;
  //         console.log("Data: ", data);
  //         setProducts(data);
  //         console.log("products ", data);
  //         // console.log(data[0].Records, "real");
  //         if (data.length > 0) {
  //           setSelectedProductID(data[0].ProductID);
  //           console.log("selectedProductID ", data[0].ProductID);
  //           updateParsedData(data[0].Records);
  //           console.log("records",data[0].Records);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching product data:", error);
  //       } finally {
  //         setIsLoading(false); 
  //       }
  //     };
  //   }
  //   fetchProductData();
  // }, []);
  
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
  console.log('Data ', finalData);
  // console.log("final", finalData);
};

useEffect(() => {
  const fetchProductData = async () => {
    setIsLoading(true);
    if (username) {
      try {
        const productResponse = await axiosInstance.get<Product[]>(`/api/Demand/demand/`, {
          params: { username: username },
        });
        const productData = productResponse.data;


        const predictionResponse = await axiosInstance.get<Prediction[]>(
          `/api/DemandPrediction/prediction/${username}`
        );
        const predictionData = predictionResponse.data;
        console.log(predictionData);
        const updatedParsedData = productData.map((product) => {
          const matchingPredictions = predictionData.filter(
            (prediction) => prediction.ProductID === parseInt(product.ProductID, 10)
          );

          setProducts(productData);

        if (productData.length > 0) {
          const firstProduct = productData[0];
          setSelectedProductID(firstProduct.ProductID);
          
        }
        
          if (matchingPredictions.length > 0) {
            const formattedPredictions = matchingPredictions.map((prediction) => {
              // Split the prediction 'Month' (YYYY-MM) into year and month
              const [year, month] = prediction.Month.split("-");
        
              // Create the MM/DD/YYYY format for the Month as requested
              const formattedMonth = `${month.padStart(2, "0")}/01/${year}`; // Convert to MM/DD/YYYY
        
              // Return the formatted data (Month, ProductID, Product, and UnitsSold)
              return {
                Month: formattedMonth, // Formatted Month as MM/DD/YYYY
                ProductID: prediction.ProductID.toString(), // Ensure ProductID is a string
                Product: prediction.Product, // Product name
                UnitsSold: prediction.PredictedDemand.toString(), // Predicted demand as string
              };
            });
        
            return {
              ...product,
              Records: [...product.Records, ...formattedPredictions], // Append formatted predictions to the existing records
            };
          }
        
          return product;
        });
        
        console.log("Updated Parsed Data:", updatedParsedData);

        setProducts(updatedParsedData as Product[]);
        if (updatedParsedData.length > 0) {
          updateParsedData(updatedParsedData[0].Records);
        }
      } catch (error) {
        console.error("Error fetching product or prediction data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  fetchProductData();
}, [username]);



      
// const combineParsedData = (parsedData: ParsedData[], predictedDemandData: any[]): ParsedData[] => {
  
//   const predictedMap: { [key: string]: number } = {};

  
//   predictedDemandData.forEach(item => {
//     const [year, monthIndex] = item.month.split("-");
//     const monthName = getMonthName(parseInt(monthIndex) - 1); 
//     const key = `${monthName}-${year}`; 
//     predictedMap[key] = item.PredictedDemand; 
//   });

  
//   const combinedData: ParsedData[] = parsedData.map(data => {
//     const combinedPoint: ParsedData = { month: data.month }; 

//     const yearKeys = Object.keys(data).filter(key => key !== "month");
//     yearKeys.forEach(year => {
      
//       const existingValue = data[year] as number || 0; 
//       const key = `${data.month}-${year}`; 
      
      
//       combinedPoint[year] = existingValue + (predictedMap[key] || 0); 
//     });

//     return combinedPoint; 
//   });

//   return combinedData; 
// };



//   useEffect(() => {
//     const fetchDemandPrediction = async () => {
//       if (username) {
//         try {
//           const response = await axiosInstance.get(`/api/DemandPrediction/prediction/${username}`);
//           const data = response.data; 


          
//           // const updatedParsedData = combineParsedData(parsedData, data);
//           console.log('Original data ', parsedData);
//           console.log('new data ', data);
//           // console.log('combined data ', updatedParsedData);
//           // setParsedData(updatedParsedData);

          
//           // console.log("Combined Data:", updatedParsedData);
//         } catch (error) {
//           console.error("Error fetching demand prediction data:", error);
//         }
//       }
//     };

//     fetchDemandPrediction();
// }, []);



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

  // const exportToPDF = async () => {
  //   if (chartRef.current) {
  //     const canvas = await html2canvas(chartRef.current, { scale: 0.75 });
  //     const imgData = canvas.toDataURL("image/png", 0.75);
  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "pt",
  //       format: [612, 792],
  //     });
  //     const margin = 36;
  //     const imgWidth = pdf.internal.pageSize.getWidth() - margin * 2;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     const textX = margin;
  //     const textY = margin;

      
  //       pdf.setFontSize(8);
  //       pdf.text(`Exported by: ${username}`, textX + 20, textY + 40);
  //       pdf.text(`${selectedYears} Year/s Trend `, textX + 20, textY + 65);
  //       pdf.addImage(imgData, "PNG", margin, textY + 80, imgWidth, imgHeight);
  //       pdf.save("product_graph_forecast.pdf");
            
  //   }
  // };

  const exportToPDF = async () => {
    if (chartRef.current) {
      // Determine if the device is mobile based on screen width
      const isMobile = window.innerWidth <= 768;
  
      // Set scale, PDF dimensions, and font size based on device type
      const canvasScale = isMobile ? 1.5 : 0.75; // Higher scale for better clarity on mobile
      const pdfFormat = isMobile ? [450, 640] : [612, 792]; // Smaller format for mobile
      const fontSize = isMobile ? 10 : 8;
  
      // Capture canvas with adjusted scale for clarity
      const canvas = await html2canvas(chartRef.current, { scale: canvasScale });
      const imgData = canvas.toDataURL("image/png", canvasScale);
  
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: pdfFormat,
      });
  
      const margin = isMobile ? 24 : 36; // Smaller margins for mobile
      const imgWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      const textX = margin;
      const textY = margin;
  
      // Set font size and add text for mobile or desktop
      pdf.setFontSize(fontSize);
      pdf.text(`Exported by: ${username}`, textX + 10, textY + 30);
      pdf.text(`${selectedYears} Year/s Trend`, textX + 10, textY + 50);
  
      // Add image to PDF and adjust positioning based on text
      pdf.addImage(imgData, "PNG", margin, textY + 60, imgWidth, imgHeight);
  
      // Save the PDF with an appropriate name
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


// import { useState, useEffect, useRef } from "react";
// import { axiosInstance } from "../services/axios";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// type MonthNames = 
//   "January" | "February" | "March" | "April" | "May" | "June" | 
//   "July" | "August" | "September" | "October" | "November" | "December";

// const monthNames: MonthNames[] = [
//   "January", "February", "March", "April", "May",
//   "June", "July", "August", "September", "October",
//   "November", "December"
// ];
// interface ParsedData {
//   month: string;
//   [key: string]: number | string; 
// }
// interface MonthData {
//   month: string;
//   [year: string]: number | string; 
// }

// interface Record {
//   Month: string; 
//   UnitsSold: number; 
// }
// interface Product {
//   ProductID: string;
//   Records: Record[]; 
//   Product: string;
//   Month: string;
// }

// export const ProductGraphController = () => {
//   const username = localStorage.getItem("username");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [parsedData, setParsedData] = useState<ParsedData[]>([]);
//   const [selectedProductID, setSelectedProductID] = useState("");
//   const [selectedYears, setSelectedYears] = useState(1);
//   const [isLoading, setIsLoading] = useState(true); 
//   const [tickFormatter, setTickFormatter] = useState(() => (month : MonthNames) => monthsShort[month]);
//   const chartRef = useRef<HTMLDivElement>(null);

//   const getMonthName = (index: number): MonthNames => monthNames[index];

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

//   useEffect(() => {
//     const updateTickFormatter = () => {
//       if (window.matchMedia("(min-width: 1280px)").matches) {
//         setTickFormatter(() => (month: MonthNames) => monthsFull[month] || month);
//       } else if (window.matchMedia("(min-width: 1024px)").matches) {
//         setTickFormatter(() => (month: MonthNames) => monthsShort[month] || month);
//       } else {
//         setTickFormatter(() => (month: MonthNames) => monthsInitial[month] || month);
//       }
//     };
  
    
//     updateTickFormatter();
  
    
//     window.addEventListener("resize", updateTickFormatter);
  
    
//     return () => window.removeEventListener("resize", updateTickFormatter);
//   }, []);

  
//   useEffect(() => {
//     const fetchProductData = async () => {
//       setIsLoading(true);
//       if(username) {
//         try {
//           const response = await axiosInstance.get(`/api/Demand/demand/`, {
//             params: { username: username }
//           });
//           const data = response.data;
//           setProducts(data);
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
  
//   const updateParsedData = (records: any[]) => {
//     const salesDataByMonthAndYear: { [year: string]: number[] } = {}; 

//   records.forEach((record: { Month: string; UnitsSold: string }) => {
//     const [day, month, year] = record.Month.split("/");
//     const monthIndex = parseInt(month) - 1;

    
//     if (!salesDataByMonthAndYear[year]) {
//       salesDataByMonthAndYear[year] = Array(12).fill(0);
//     }

    
//     salesDataByMonthAndYear[year][monthIndex] += parseInt(record.UnitsSold);
//   });

//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December",
//   ];

//   const formattedData: MonthData[] = months.map((monthName, index) => {
//     const monthData: MonthData = { month: monthName }; 

    
//     Object.keys(salesDataByMonthAndYear).forEach((year) => {
//       monthData[year.slice(0, 4)] = salesDataByMonthAndYear[year][index] || 0;
//     });

//     return monthData; 
//   });

//   const allYears = Object.keys(salesDataByMonthAndYear).sort();
//   const latestYears = allYears.slice(-selectedYears).map(year => year.slice(0, 4)); 

//   const finalData = formattedData.map((dataPoint) => {
//     const filteredPoint: ParsedData = { month: dataPoint.month }; 
  
//     latestYears.forEach((year) => {
//       filteredPoint[year] = dataPoint[year] || 0; 
//     });
  
//     return filteredPoint;  
//   });

//   setParsedData(finalData); 
// };
      
// const combineParsedData = (parsedData: ParsedData[], predictedDemandData: any[]): ParsedData[] => {
  
//   const predictedMap: { [key: string]: number } = {};

  
//   predictedDemandData.forEach(item => {
//     const [year, monthIndex] = item.month.split("-");
//     const monthName = getMonthName(parseInt(monthIndex) - 1); 
//     const key = `${monthName}-${year.slice(0, 4)}`;
//     predictedMap[key] = item.PredictedDemand; 
//   });

  
//   const combinedData: ParsedData[] = parsedData.map(data => {
//     const combinedPoint: ParsedData = { month: data.month }; 

//     const yearKeys = Object.keys(data).filter(key => key !== "month");
//     yearKeys.forEach(year => {
      
//       const existingValue = data[year] as number || 0; 
//       const key = `${data.month}-${year}`;
      
      
//       combinedPoint[year] = existingValue + (predictedMap[key] || 0); 
//     });

//     return combinedPoint; 
//   });

//   return combinedData; 
// };

// useEffect(() => {
//     const fetchDemandPrediction = async () => {
//       if (username) {
//         try {
//           const response = await axiosInstance.get(`/api/DemandPrediction/prediction/${username}`);
//           const data = response.data; 

          
//           const formattedData = data.map((item: { Month: string; ProductID: string; PredictedDemand: number; }) => {
//             const [year, monthIndex] = item.Month.split("-"); 
//             return {
//               [item.ProductID]: item.PredictedDemand, 
//               month: getMonthName(parseInt(monthIndex) - 1),
//               year: parseInt(year.slice(0, 4)), 
//             };
//           });

          
//           const updatedParsedData = combineParsedData(parsedData, formattedData);
//           setParsedData(updatedParsedData);

//         } catch (error) {
//           console.error("Error fetching demand prediction data:", error);
//         }
//       }
//     };

//     fetchDemandPrediction();
// }, []);

//   const handleProductChange = (selectedID: string) => {
//     const selectedProduct = products.find((product) => product.ProductID === selectedID);
//     if (selectedProduct) {
//       updateParsedData(selectedProduct.Records);
//       setSelectedProductID(selectedID);
//     }
//   };

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

      
//         pdf.setFontSize(8);
//         pdf.text(`Exported by: ${username}`, textX + 20, textY + 40);
//         pdf.text(`${selectedYears} Year/s Trend `, textX + 20, textY + 65);
//         pdf.addImage(imgData, "PNG", margin, textY + 80, imgWidth, imgHeight);
//         pdf.save("product_graph_forecast.pdf");
            
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