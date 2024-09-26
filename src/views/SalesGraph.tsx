import { useState } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link, useLocation } from "react-router-dom"
import Forecast from "./Sales"
import { motion } from "framer-motion"

export const description = "A sales trend line chart with selectable time range"

// Define the structure for monthly data
type MonthlyData = {
  month: string;
  [year: number]: number; // Use number keys for years
}

// Generates sales data for the given years
const generateSalesData = (years: number) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const currentYear = new Date().getFullYear()
  const data: MonthlyData[] = []

  for (let i = 0; i < years; i++) {
    const year = currentYear - i
    
    // Generate sales data for each month in the current year
    months.forEach(month => {
      const existingMonth = data.find(d => d.month === month)
      if (existingMonth) {
        existingMonth[year] = Math.floor(1000000 + Math.random() * 500000) // Random sales data
      } else {
        const newMonthData: MonthlyData = { month, [year]: Math.floor(1000000 + Math.random() * 500000) }
        data.push(newMonthData)
      }
    })
  }

  return data
}

// Different colors for each year
const yearColors = [
  "hsl(210, 80%, 60%)", // Blue
  "hsl(120, 80%, 60%)", // Green
  "hsl(0, 80%, 60%)",   // Red
  "hsl(60, 80%, 60%)",  // Yellow
  "hsl(300, 80%, 60%)", // Purple
]

export default function SalesGraph () {
  const [selectedYears, setSelectedYears] = useState(3) // Set selected years as a number
  const salesData = generateSalesData(selectedYears)

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${value}`
  }

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div>
      <div 
        className="hidden  md:block px-20 mt-5 "
      >
        <ul className="flex items-center gap-6 text-2xl">
          <li
            className={`inline-block py-1 px-3 font-semibold transition-colors duration-300
            ${isActive("/sales-forecast") ? "text-primary shadow-[0_3px_0_-1px_hsl(var(--primary))]" : "text-customTextColor hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))]"}
          `}
          >
            <Link to="/sales-forecast">Sales</Link>
          </li>
          <li
            className={`inline-block py-1 px-3 font-semibold transition-colors duration-300
            ${isActive("/products-forecast") ? "text-primary shadow-[0_3px_0_-1px_hsl(var(--primary))]" : "text-customTextColor hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))]"}
          `}
          >
            <Link to="/products-forecast">Products</Link>
          </li>
        </ul>
      </div>
      

      <motion.div 
        className="flex items-center px-24 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <p className="mr-5 font-lato">Year</p>
        <div className="flex gap-4 items-center font-lato">
          {[1, 3, 5, 10].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYears(year)}
              className={`px-4 h-8 w-8 text-xs flex justify-center items-center py-2 rounded-lg ${selectedYears === year ? "bg-primary text-white" : "bg-transparent"}`}
            >
              {year}
            </button>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <Card className="mx-20 mt-5 mb-20">
          <CardHeader className="p-4">
            
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickMargin={10} />
                <YAxis tickFormatter={formatYAxis} tickMargin={10} />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]}
                  labelFormatter={(label) => `Month: ${label}`}
                />

                {/* Plot a line for each year */}
                {Array.from(new Set(salesData.flatMap(item => Object.keys(item).filter(key => key !== 'month').map(key => Number(key))))).map((year, index) => (
                  <Line
                    key={year}
                    type="monotone"
                    dataKey={year.toString()}
                    name={`${year} Sales`}
                    stroke={yearColors[index % yearColors.length]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
      </motion.div>
      

      <Forecast/>
    </div>
  )
}

