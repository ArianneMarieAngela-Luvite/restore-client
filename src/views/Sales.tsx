import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, useLocation } from "react-router-dom"
import timeline from "../assets/Vertical Timeline.png"
import { Separate } from "../components/Separate";
import { NextMonthlyForecast } from "./NextMonthlyForecas";

export default function Forecast () {
    const location = useLocation();
    const currentPath = location.pathname;
  
    const isActive = (path: string) => currentPath === path;
    const sales = "₱14, 324.53";

  return (
    <div className="px-20 mb-8">
        {/* <div className="hidden md:block mt-5">
        <ul className="flex items-center gap-6 text-2xl">
            <li
            className={`inline-block py-1 px-3 font-semibold transition-colors duration-300
            ${isActive("/sales-forecast") ? "text-primary shadow-[0_3px_0_-1px_hsl(var(--primary))]" : "text-customTextColor hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))]"}
            `}
            >
            <Link to="/sales-forecast">Forecasting</Link>
            </li>
            <li
            className={`inline-block py-1 px-3 font-semibold transition-colors duration-300
            ${isActive("/products-forecast") ? "text-primary shadow-[0_3px_0_-1px_hsl(var(--primary))]" : "text-customTextColor hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))]"}
            `}
            >
            <Link to="/products-forecast">Products</Link>
            </li>
        </ul>
        </div> */}
        <Button className="flex mt-5 ml-auto">Export</Button>
        <Card className="flex justify-between items-center w-full h-32 my-2 mb-3  bg-primary p-7">
            <div className="ml-5">
            <CardTitle className="font-lato text-customBackground font-thin text-md w-fit">Quarterly Sales</CardTitle>
            <CardContent className="text-customBackground text-4xl font-bold font-lato p-0 mt-2 w-fit">{sales}</CardContent>
            </div>
            <div className="ml-auto p-0">
                <img src={timeline} height={110} width={110} />
            </div>
            
            
           
        </Card>
        
        <div className="flex gap-3">
            <div className="flex flex-col w-2/5 gap-3">
                <div className="bg-customCardColor p-3 rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow className="">
                                <TableHead colSpan={4} className="">Next Monthly Forecast</TableHead>
                            </TableRow>
                            <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="bg-customCardColor rounded-lg p-3 h-96">
                <Table>
                        <TableHeader>
                            <TableRow className="">
                                <TableHead colSpan={3} className="">Next Monthly Forecast</TableHead>
                                <TableHead className="hover:shadow-[0_2px_0_-1px_hsl(var(--primary))]] flex justify-end items-center text-xs">
                                <NextMonthlyForecast/>

                                </TableHead>
                            </TableRow>
                            <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="w-3/5 h-auto bg-customCardColor rounded-lg py-7 px-10">
                <Separate />
            </div>
        </div>
        
        
    </div>
  )
}

