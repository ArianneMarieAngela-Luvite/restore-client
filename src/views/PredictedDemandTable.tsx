import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType} from 'antd';
import { ScrollArea } from '@/components/ui/scroll-area'; 
import "../index.css";
import customTheme from "../constants/customTheme"
import ConfigProvider from 'antd/es/config-provider';
import { Audio } from "react-loader-spinner";

interface ProductData {
  key: React.Key;
  ProductID: string;
  Product: string;
  PredictedDemand: number;
}

interface PredictedDemandProps {
  onLoadingChange?: (isLoading: boolean) => void;
}

const columns: TableColumnsType<ProductData> = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    render: (_, __, index) => index + 1,
    width: '10%',
  },
  {
    title: 'Product ID',
    dataIndex: 'ProductID',
    width: '20%',
  },
  {
    title: 'Product Name',
    dataIndex: 'Product',
    width: '40%',
  },
  {
    title: 'Projected Demand',
    dataIndex: 'PredictedDemand',
    sorter: (a, b) => a.PredictedDemand - b.PredictedDemand,
    defaultSortOrder: 'descend',
    width: '30%',
  },
];

const PredictedDemand: React.FC<PredictedDemandProps> = ({ onLoadingChange }) => {
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPredictedData = useCallback(async () => {
    const username = localStorage.getItem("username");
    if (!username) return;

    try {
      setLoading(true);
      onLoadingChange?.(true);

      const cachedData = sessionStorage.getItem(`predictedData_${username}`);
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        onLoadingChange?.(false);
        return;
      }

      const response = await fetch(
        `https://restore-backend.onrender.com/api/DemandPrediction/prediction/${username}`
      );
      const result = await response.json();

      const mappedData = result.map((item: any, index: number) => ({
        key: index,
        ProductID: item.ProductID,
        Product: item.Product,
        PredictedDemand: item.PredictedDemand,
      }));

      setData(mappedData);
      sessionStorage.setItem(`predictedData_${username}`, JSON.stringify(mappedData));
    } catch (error) {
      console.error("Failed to fetch predicted data:", error);
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  }, [onLoadingChange]);

  useEffect(() => {
    fetchPredictedData();
  }, [fetchPredictedData]);

  return (
    <ConfigProvider theme={customTheme}>
      <ScrollArea className="h-[90%] px-8 ">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Audio color="#30a75f" height={50} width={50} ariaLabel="loading" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table<ProductData>
              id="productDemand"
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 12 }}
              className="text-base font-lato"
              scroll={{ x: '100%' }}
              rowClassName={() => 'text-sm md:text-base'}
              showSorterTooltip={{ target: 'sorter-icon' }}
            />
          </div>
        )}
      </ScrollArea>
    </ConfigProvider>
  );
};

export default PredictedDemand;


