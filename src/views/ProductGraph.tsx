import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"; 
import { ComboboxDemo } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
// import { ClipLoader } from "react-spinners";
import { Audio } from "react-loader-spinner";
import { ProductGraphController } from "../controllers/ProductGraphController";

export default function ProductGraph() {
  const {
    products,
    parsedData,
    selectedYears,
    isLoading,
    yearColors,
    chartRef,
    tickFormatter,
    handleProductChange,
    setSelectedYears,
    getLatestYears,
    exportToPDF,
  } = ProductGraphController();

  return (
    <>
    <motion.div 
      className="flex flex-col md:flex-row items-center px-24 pt-8 gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2 }}
    >
        <div className="flex gap-4 mx-5 items-center justify-center md:justify-start font-lato xs:w-screen px-5">
          <p className="mr-5 font-lato">Year/s</p>
          {[1, 3, 5].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYears(year)}
              className={`px-4 h-9 md:w-14 text-sm flex justify-center items-center py-2 rounded-lg border w-28
                ${selectedYears === year ? "bg-primary text-white font-bold" : "bg-transparent"}`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="flex gap-3 px-5 md:ml-auto xs:w-screen justify-center md:justify-end xs:justify-center"
        >
          <ComboboxDemo
            items={products}
            onSelect={handleProductChange}
            
          />
          <Button onClick={exportToPDF} disabled={isLoading}>Export to PDF</Button>
        </div>

        </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <Card className="md:mx-20 md:mt-5 md:mb-20 " ref={chartRef}>
        <CardHeader className="p-4">
        <h2 className="md:text-lg text-base font-semibold px-6 py-3">Product Demands</h2>
          </CardHeader>
        <CardContent>
        {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <Audio color="#30a75f" height={70} width={70} ariaLabel="loading" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                {parsedData.length > 0 ? (
                  <LineChart 
                    data={parsedData}
                    margin={{ top: 5, right: 5, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" className="md:text-sm text-xs" tickFormatter={tickFormatter} />
                    <YAxis className="md:text-sm text-xs" />
                    <Tooltip />
                    {getLatestYears().map((year, index) => (
                      <Line
                        key={year}
                        type="monotone"
                        dataKey={year}
                        stroke={yearColors[index % yearColors.length]}
                        name={`Sales in ${year}`}
                      />
                    ))}
                  </LineChart>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No data available</p>
                  </div>
                )}
              </ResponsiveContainer>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap px-5 w-screen justify-center items-center pb-4 md:text-base text-xs">
            {getLatestYears().map((year, index) => (
              <div key={year} className="flex items-center mr-4 mb-2">
                <div
                  className="md:w-4 md:h-4 w-2 h-2 rounded-full"
                  style={{ backgroundColor: yearColors[index % yearColors.length] }}
                />
                <span className="ml-2">{year}</span>
              </div>
            ))}
          </CardFooter>
          
        </Card>
      </motion.div>
      </>
  );
}