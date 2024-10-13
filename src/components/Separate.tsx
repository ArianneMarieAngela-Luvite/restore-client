import { NextMonthlyForecast } from "@/views/NextMonthlyForecast"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table"
import { axiosInstance } from "@/services/axios";
import { useEffect, useState } from "react";

export function Separate() {
  const username = localStorage.getItem("username");
  console.log(username);
  
  const [productDemandData, setProductDemandData] = useState([]);

  // Fetch demand data from API using axiosInstance
  useEffect(() => {
    if (username) {
      axiosInstance.get(`/api/Demand/demand/${username}`)
        .then(response => {
          setProductDemandData(response.data);
        })
        .catch(error => {
          console.error("Error fetching product demand data:", error);
        });
    }
  }, [username]);
  return (
    <div className="bg-customCardColor rounded-lg p-3 h-96">
      <Table id="productDemand">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>Product Demand</TableHead>
            <TableHead className="hover:shadow-[0_2px_0_-1px_hsl(var(--primary))] flex justify-end items-center text-xs">
              <NextMonthlyForecast />
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px]">Product ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Units Sold</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productDemandData.length > 0 ? (
            productDemandData.map(product => 
              product.Records.map(record => (
                <TableRow key={`${product.ProductID}-${record.Month}`}>
                  <TableCell className="font-medium">{product.ProductID}</TableCell>
                  <TableCell>{record.Product}</TableCell>
                  <TableCell>{record.UnitsSold}</TableCell>
                </TableRow>
              ))
            )
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
function setProductDemandData(data: any) {
  throw new Error("Function not implemented.");
}

