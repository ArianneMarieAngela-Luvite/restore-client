import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios";

export type PredictedDemand = {
  Month: string;
  ProductID: string;
  Product: string;
  PredictedDemand: string;
};

export interface SalesPrediction {
  prediction: string;
  next_month: string;
  percentage_increase: string;
}

export const useInsightsController = () => {
  const [productDemandPredictionData, setProductDemandPredictionData] = useState<PredictedDemand[]>([]);
  const [insights, setInsights] = useState<string>("");
  const [salesPredictionData, setSalesPredictionData] = useState<SalesPrediction[]>([]);
  const [nextMonthName, setNextMonthName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const username = localStorage.getItem("username");

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const fetchSalesPredictionData = () => {
    if (username) {
      axiosInstance.get(`/api/SalesPrediction/prediction`, { params: { username } })
        .then(response => {
          const salesData = response.data;
          if (salesData && salesData.length > 0) {
            const monthNumber = salesData[0].next_month.split("-")[1];
            const monthIndex = parseInt(monthNumber, 10) - 1;
            const monthName = monthNames[monthIndex];
            setSalesPredictionData(salesData);
            setNextMonthName(monthName);
          }
        })
        .catch(error => console.error("Error fetching sales prediction data:", error));
    }
  };

  const fetchProductDemandPredictionData = async () => {
    if (username) {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/DemandPrediction/prediction/${username}`);
        if (response.data) {
          const sortedData: PredictedDemand[] = response.data.sort((a: { PredictedDemand: number }, b: { PredictedDemand: number }) => b.PredictedDemand - a.PredictedDemand);
          setProductDemandPredictionData(sortedData);
        }
      } catch (error) {
        // console.error("Error fetching product demand prediction data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchInsightsData = () => {
    if (username) {
      setLoading(true);
      axiosInstance.get(`/api/Insight/${username}`, { headers: { "Content-Type": "application/json" } })
        .then(response => {
          if (response.data.length > 0) setInsights(response.data[0].InsightData);
        })
        .catch(error => console.error("Error fetching forecast insights:", error))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchSalesPredictionData();
    fetchProductDemandPredictionData();
    fetchInsightsData();
  }, [username]);

  return {
    productDemandPredictionData,
    salesPredictionData,
    nextMonthName,
    insights,
    loading
  };
};
