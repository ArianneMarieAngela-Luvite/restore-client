import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
// import { ClipLoader } from "react-spinners";
import { Audio } from "react-loader-spinner";
import { SalesGraphController } from "../controllers/SalesGraphController"; 
import transition from "@/transition";

function SalesGraph() {
  const {
    parsedData,
    selectedYears,
    setSelectedYears,
    getLatestYears,
    isLoading,
    exportToPDF,
    chartRef,
    tickFormatter
  } = SalesGraphController();

  const yearColors = [
    "hsl(210, 80%, 60%)", // Blue
    "hsl(120, 80%, 60%)", // Green
    "hsl(0, 80%, 60%)",   // Red
    "hsl(60, 80%, 60%)",  // Yellow
    "hsl(300, 80%, 60%)", // Purple
    "hsl(30, 80%, 60%)",  // Orange
    "hsl(180, 80%, 60%)", // Teal
  ];

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `P${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `P${(value / 1000).toFixed(1)}K`;
    return `P${value}`;
  };

  return (
    <>
      <motion.div
        className="flex flex-col sm:flex-row items-center px-24 pt-8 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <div className="flex justify-end font-lato w-screen px-5 sm:hidden">
          <Button onClick={exportToPDF}>Export to PDF</Button>
        </div>
        <div className="flex gap-4 items-center justify-center font-lato px-5 lg:px-10 lg:justify-start w-screen md:w-50%">
          <p className="mr-5 font-lato">Year/s</p>
          {[1, 3, 5, 10].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYears(year)}
              className={`px-4 h-9 text-sm flex justify-center items-center py-2 rounded-lg border w-28 md:w-14
                ${selectedYears === year ? "bg-primary text-white font-bold" : "bg-transparent"}`}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="hidden justify-end px-5 md:px-10 lg:ml-auto lg:justify-end sm:flex md:visible xs:w-screen xs:justify-center">
          <Button onClick={exportToPDF} disabled={isLoading}>Export to PDF</Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <Card className="p-0 lg:mx-20 lg:mt-5 lg:mb-20" ref={chartRef}>
          <CardHeader className="p-4">
            <h2 className="md:text-lg text-base font-semibold px-6 py-3">Sales Data</h2>
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
                    margin={{ top: 5, right: 5, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" className="md:text-sm text-xs" tickFormatter={tickFormatter} tickMargin={10} />
                    <YAxis tickFormatter={formatYAxis} tickMargin={10}  className="md:text-sm text-xs" />
                    <Tooltip
                      formatter={(value) => [`P${Number(value).toLocaleString()}`, "Sales"]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    {getLatestYears().map((year, index) => (
                      <Line
                        key={year}
                        type="monotone"
                        dataKey={year} // Ensure this matches the year keys in parsedData
                        name={`${year}`}
                        stroke={yearColors[index % yearColors.length]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
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
export default transition(SalesGraph);
