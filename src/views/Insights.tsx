import { useInsightsController } from '../controllers/InsightsController';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as XLSX from "xlsx";
import timeline from "../assets/Vertical Timeline.png";
import { Audio } from "react-loader-spinner";
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import jsPDF from 'jspdf';
import PredictedDemand from './PredictedDemandTable';
import { motion } from 'framer-motion';


export default function Insights() {
  const {
    productDemandPredictionData,
    salesPredictionData,
    nextMonthName,
    insights,
    loading
  } = useInsightsController();


  const [fileType, setFileType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    const salesSheetData = [["Prediction", "Next Month", "Percentage Increase"]];
    salesPredictionData.forEach(item => {
      salesSheetData.push([item.prediction, item.next_month, item.percentage_increase]);
    });
    const salesSheet = XLSX.utils.aoa_to_sheet(salesSheetData);

    
    Object.keys(salesSheet).forEach(key => {
      if (key[0] === '!') return; 
      salesSheet[key].s = {
        alignment: { wrapText: true }
      };
    });

  
    const salesColumnWidths = [
      { wpx: Math.max(...salesSheetData.map(row => row[0].toString().length)) * 7 }, // Prediction
      { wpx: Math.max(...salesSheetData.map(row => row[1].toString().length)) * 7 }, // Next Month
      { wpx: Math.max(...salesSheetData.map(row => row[2].toString().length)) * 7 }  // Percentage Increase
    ];
    salesSheet['!cols'] = salesColumnWidths;

    XLSX.utils.book_append_sheet(workbook, salesSheet, "Sales Prediction");

    
    const productDemandSheetData = [["Product ID", "Product Name", "Projected Demand"]];
    productDemandPredictionData.forEach(item => {
      productDemandSheetData.push([item.ProductID, item.Product, item.PredictedDemand]);
    });
    const productDemandSheet = XLSX.utils.aoa_to_sheet(productDemandSheetData);

    
    Object.keys(productDemandSheet).forEach(key => {
      if (key[0] === '!') return; 
      productDemandSheet[key].s = {
        alignment: { wrapText: true }
      };
    });

    
    const productDemandColumnWidths = [
      { wpx: Math.max(...productDemandSheetData.map(row => row[0].toString().length)) * 7 }, // Product ID
      { wpx: Math.max(...productDemandSheetData.map(row => row[1].toString().length)) * 7 }, // Product Name
      { wpx: Math.max(...productDemandSheetData.map(row => row[2].toString().length)) * 7 }  // Projected Demand
    ];
    productDemandSheet['!cols'] = productDemandColumnWidths;

    XLSX.utils.book_append_sheet(workbook, productDemandSheet, "Product Demand Prediction");

    
    const insightsSheetData = [["Insight Data"]];
    if (insights) {
      insightsSheetData.push([insights]);
    } else {
      insightsSheetData.push(["No insights available"]);
    }
    const insightsSheet = XLSX.utils.aoa_to_sheet(insightsSheetData);

    
    Object.keys(insightsSheet).forEach(key => {
      if (key[0] === '!') return; 
      insightsSheet[key].s = {
        alignment: { wrapText: true }
      };
    });

    
    const insightsColumnWidths = insights ? [{ wpx: Math.max(insights.length, 20) * 7 }] : [{ wpx: 150 }]; // Default width if no insights
    insightsSheet['!cols'] = insightsColumnWidths;

    XLSX.utils.book_append_sheet(workbook, insightsSheet, "Insights");

    
    const excelFileName = "insights_data.xlsx";
    XLSX.writeFile(workbook, excelFileName);
  };


  const exportToPdf = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text("Sales and Product Demand Insights", 14, 20);
  
    // Sales Prediction Data
    doc.setFontSize(16);
    doc.text("Sales Prediction Data", 14, 30);
    doc.setFontSize(12);
    doc.text("Prediction", 14, 40);
    doc.text("Next Month", 100, 40);
    doc.text("Percentage Increase", 150, 40);
    
    salesPredictionData.forEach((item, index) => {
      const y = 50 + index * 10;
      doc.text(item.prediction.toString(), 14, y);
      doc.text(item.next_month, 100, y);
      doc.text(item.percentage_increase.toString(), 150, y);
    });

    doc.setFontSize(16);
    doc.text("Insights Data", 14,  100); // Title

    doc.setFontSize(12);

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    const maxWidth = pageWidth - 2 * margin;  // Define the max width for text wrapping

    if (insights) {
      doc.text(insights, margin, 110, { maxWidth: maxWidth });
    } else {
      doc.text("No insights available", margin, 30, { maxWidth: maxWidth });
    }

    doc.addPage();
    doc.setFontSize(16);
    doc.text("Product Demand Prediction Data", 14, 20);
    doc.setFontSize(12);

    // Define the starting position for the table
    const startY = 30;
    const cellHeight = 10;
    const tableColumn = ["Rank", "Product ID", "Product Name", "Projected Demand"];
    const columnWidths = [20, 40, 80, 40]; // Define widths for each column

    // Draw the table header
    tableColumn.forEach((header, index) => {
      const x = 14 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0); // Calculate x position
      doc.text(header, x, startY);
    });

    // Draw a line under the header
    doc.line(14, startY + 2, 14 + columnWidths.reduce((a, b) => a + b, 0), startY + 2);

    // Draw the table rows
    productDemandPredictionData.forEach((item, index) => {
      const y = startY + cellHeight + (index * cellHeight);

      // Draw the rank (index + 1)
      doc.text((index + 1).toString(), 14, y); // Rank Column
      doc.text(item.ProductID.toString(), 14 + columnWidths[0], y); // Product ID
      doc.text(item.Product, 14 + columnWidths[0] + columnWidths[1], y); // Product Name
      doc.text(item.PredictedDemand.toString(), 14 + columnWidths[0] + columnWidths[1] + columnWidths[2], y); // Projected Demand
    });

    // Optional: Draw lines for each row
    for (let i = 0; i < productDemandPredictionData.length; i++) {
      const y = startY + cellHeight + (i * cellHeight);
      doc.line(14, y + 2, 14 + columnWidths.reduce((a, b) => a + b, 0), y + 2); // Draw row line
    }

    // Optional: Draw a footer if no data available
    if (productDemandPredictionData.length === 0) {
      doc.text("No product demand prediction data available", 14, startY + cellHeight + 10);
    }
  
    // Save the PDF
    const pdfFileName = "insights_data.pdf";
    doc.save(pdfFileName);
  };
  
  const handleExport = () => {
    if (fileType === "excel") {
      console.log(fileType)
      exportToExcel();
    } else if (fileType === "pdf") {
      exportToPdf();
    } else {
      alert("Please select a file type to export.");
    }
  };
  return (
    <motion.div className="px-5 md:px-20 lg:px-20 xl:px-20 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2 }}>
      <div className="flex gap-3 justify-end my-10">
        <Select onValueChange={(value) => setFileType(value)}>
          <SelectTrigger className='w-[180px]'>
          {/* <Button className='rounded-md text-black text-start w-44 bg-white border shadow-none font-normal hover:bg-gray-100' >Select file type</Button> */}
          <SelectValue placeholder="Select file type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excel"className='text-left'  >Export to Excel</SelectItem>
            <SelectItem value="pdf" className='text-left'  >Export to PDF</SelectItem>
          </SelectContent>              
        </Select>
        <Button className="" onClick={handleExport} disabled={isLoading}>Export</Button>
      </div>


      <Card className="flex justify-between items-center w-full h-32 my-2 mb-5 bg-primary p-2 md:p-7 lg:p-7 xl:p-7 ">
        <div className="ml-5 ">
          <CardTitle className="font-lato text-base text-customBackground font-thin md:text-base lg:text-base xl:text-base  w-fit">Forecasted Sales</CardTitle>
          {loading ? (
            <div className='flex items-center pt-5 gap-2'>
              <span className='text-white text-base font-lato'>Fetching data </span>
              {/* <ClipLoader size={25} color='white'/> */}
              <Audio color="#30a75f" height={30} width={30} ariaLabel="loading" />
            </div>
          ) : (
            <CardContent className="text-customBackground text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold font-lato p-0 mt-2 w-fit">
              PHP{" "}
              {salesPredictionData.length > 0
                ? parseFloat(salesPredictionData[0].prediction)
                    .toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : "No prediction data available"}
            </CardContent>
          )}
          
        </div>
        <div className="ml-auto p-0">
          <img src={timeline} height={110} width={110} alt="Timeline" />
        </div>
      </Card>

      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-5 ">
        <div className="flex flex-col md:w-2/5 lg:w-2/5 xl:w-2/5  gap-5">
          <div className="bg-customCardColor px-5 py-3 rounded-md shadow-xl">
            <h1 className="font-lato text-[14px] lg:text-base xl:text-base font-semibold text-gray-700 mx-2 mt-2 border-slate-300 border-b-[1px] pb-2">
              Next Month Forecast
            </h1>
            <div className="px-2 ">
              {loading ? (
                <div className='flex h-[50px] justify-center items-center gap-2'>
                  <Audio color="#30a75f" height={30} width={30} ariaLabel="loading" />
                </div>
              ) : (
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
                          <TableCell className="text-sm md:text-base">{parseFloat(salesPredictionData[0].prediction)
                    .toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                          <TableCell className="text-sm md:text-base">{salesData.percentage_increase}%</TableCell>
                        </TableRow>
                      ))
                    ): (
                      <TableRow>
                        <TableCell colSpan={3} className="text-sm lg:text-base text-gray-500 mx-4 text-center font-lato">
                          No sales prediction data available
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
              )}
            </div>
          </div>

          <div className="bg-customCardColor rounded-lg h-96 font-lato shadow-xl">
            <h1 className="font-lato text-base font-semibold text-gray-700 border-slate-300 border-b-[1px] mt-4 mx-7 mb-1 pb-1 w-auto">Forecast Insight</h1>
            
            <ScrollArea className="h-[85%] px-4">
              {loading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <Audio color="#30a75f" height={30} width={30} ariaLabel="loading" />
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

        <div className="md:w-3/5 lg:w-3/5 xl:w-3/5 h-[552px] bg-customCardColor rounded-lg py-4 shadow-xl">
          <div className="flex justify-between items-center px-4">
            <div className="font-lato items-center justify-between flex text-[14px] lg:text-base xl:text-base font-bold text-gray-700 border-slate-300 border-b-[1px] w-full mx-4 pb-2">
              Product Demand
            </div>  
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-[500px] ">
              <Audio color="#30a75f" height={50} width={50} ariaLabel="loading" />
            </div>
            ) : (
            <PredictedDemand onLoadingChange={setIsLoading} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

