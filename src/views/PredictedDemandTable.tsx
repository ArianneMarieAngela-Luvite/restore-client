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



// import React, { useCallback, useEffect, useState } from 'react';
// import { Table } from 'antd';
// import type { TableColumnsType, TableProps } from 'antd';
// import { ScrollArea } from '@/components/ui/scroll-area'; 
// import "../index.css";
// import customTheme from "../constants/customTheme"
// import ConfigProvider from 'antd/es/config-provider';
// import { Audio } from "react-loader-spinner";

// interface ProductData {
//   key: React.Key;
//   ProductID: string;
//   Product: string;
//   PredictedDemand: number;
// }

// const columns: TableColumnsType<ProductData> = [
//   {
//     title: 'Rank',
//     dataIndex: 'rank',
//     // render: (text, record, index) => index + 1,
//     // render: (index) => index + 1,
//     render: (_, __, index) => index + 1,
//     width: '10%',
//   },
//   {
//     title: 'Product ID',
//     dataIndex: 'ProductID',
//     width: '20%',
//   },
//   {
//     title: 'Product Name',
//     dataIndex: 'Product',
//     width: '40%',
//   },
//   {
//     title: 'Projected Demand',
//     dataIndex: 'PredictedDemand',
//     sorter: (a, b) => a.PredictedDemand - b.PredictedDemand,
//     defaultSortOrder: 'descend',
//     width: '30%',
//   },
// ];



// const PredictedDemand: React.FC = () => {
//   const [data, setData] = useState<ProductData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchPredictedData = useCallback(async () => {
//     const username = localStorage.getItem("username");
//     if (!username) return;

//     try {
//       const cachedData = sessionStorage.getItem(`predictedData_${username}`);
//       if (cachedData) {
//         setData(JSON.parse(cachedData));
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(
//         `https://restore-backend.onrender.com/api/DemandPrediction/prediction/${username}`
//       );
//       const result = await response.json();

//       const mappedData = result.map((item: any, index: number) => ({
//         key: index,
//         ProductID: item.ProductID,
//         Product: item.Product,
//         PredictedDemand: item.PredictedDemand,
//       }));

//       setData(mappedData);
//       sessionStorage.setItem(`predictedData_${username}`, JSON.stringify(mappedData));
//     } catch (error) {
//       console.error("Failed to fetch predicted data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPredictedData();
//   }, [fetchPredictedData]);


//   const onChange: TableProps<ProductData>['onChange'] = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//   };

//   return (
//     <ConfigProvider theme={customTheme}>
//     <ScrollArea className="h-[90%] px-8">
//       {loading ? (
//         <div className="flex justify-center items-center h-full">
//           {/* <Spin className='custom-spinner '  size="large"/> */}
//           <Audio color="#30a75f" height={50} width={50} ariaLabel="loading" />
//         </div>
//       ) : (
//         // <Table<ProductData>
//         //   id="productDemand"
          
//         //   columns={columns}
//         //   dataSource={data}
//         //   onChange={onChange}
//         //   pagination={{ pageSize: 12 }}  
//         //   className="text-base font-lato"
//         //   // scroll={{ x:375}}
//         //   scroll={{ x: '100%' }}  // Enables horizontal scrolling
//         //   rowClassName={() => 'text-sm md:text-base'}  
//         //   showSorterTooltip={{ target: 'sorter-icon' }}  
//         // />
//         <div className="overflow-x-auto">
//             <Table<ProductData>
//               id="productDemand"
//               columns={columns}
//               dataSource={data}
//               onChange={onChange}
//               pagination={{ pageSize: 12 }}
//               className="text-base font-lato"
//               scroll={{ x: '100%' }}  // Enables horizontal scrolling
//               rowClassName={() => 'text-sm md:text-base'}
//               showSorterTooltip={{ target: 'sorter-icon' }}
//             />
//           </div>
//       )}
//     </ScrollArea>
//     </ConfigProvider>
//   );
// };

// export default PredictedDemand;

// import React, { useCallback, useEffect, useState } from 'react';
// import { Table, ConfigProvider } from 'antd';
// import type { TableColumnsType, TableProps } from 'antd';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import "../index.css";
// import customTheme from "../constants/customTheme"

// interface ProductData {
//   key: React.Key;
//   ProductID: string;
//   Product: string;
//   PredictedDemand: number;
// }

// const columns: TableColumnsType<ProductData> = [
//   {
//     title: 'Rank',
//     dataIndex: 'rank',
//     render: (_, __, index) => index + 1,
//     width: '10%',
//   },
//   {
//     title: 'Product ID',
//     dataIndex: 'ProductID',
//     width: '20%',
//   },
//   {
//     title: 'Product Name',
//     dataIndex: 'Product',
//     width: '40%',
//   },
//   {
//     title: 'Projected Demand',
//     dataIndex: 'PredictedDemand',
//     sorter: (a, b) => a.PredictedDemand - b.PredictedDemand,
//     defaultSortOrder: 'descend',
//     width: '30%',
//   },
// ];

// const PredictedDemand: React.FC = () => {
//   const [data, setData] = useState<ProductData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchPredictedData = useCallback(async () => {
//     const username = localStorage.getItem("username");
//     if (!username) return;

//     try {
//       const cachedData = sessionStorage.getItem(`predictedData_${username}`);
//       if (cachedData) {
//         setData(JSON.parse(cachedData));
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(
//         `https://restore-backend.onrender.com/api/DemandPrediction/prediction/${username}`
//       );
//       const result = await response.json();

//       const mappedData = result.map((item: any, index: number) => ({
//         key: index,
//         ProductID: item.ProductID,
//         Product: item.Product,
//         PredictedDemand: item.PredictedDemand,
//       }));

//       setData(mappedData);
//       sessionStorage.setItem(`predictedData_${username}`, JSON.stringify(mappedData));
//     } catch (error) {
//       console.error("Failed to fetch predicted data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPredictedData();
//   }, [fetchPredictedData]);

//   const onChange: TableProps<ProductData>['onChange'] = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//   };

//   return (
//     <ConfigProvider theme={customTheme}>
//       <ScrollArea className="h-[90%] px-8">
//         {loading ? (
//           <div className="flex justify-center items-center h-full">
//             {/* <Spin className='custom-spinner '  size="large"/> */}
//           </div>
//         ) : (
//           <Table<ProductData>
//             id="productDemand"
//             columns={columns}
//             dataSource={data}
//             onChange={onChange}
//             pagination={{ pageSize: 12 }}  
//             className="text-base font-lato"
//             rowClassName={() => 'text-sm md:text-base'}  
//             showSorterTooltip={{ target: 'sorter-icon' }}  
//           />
//         )}
//       </ScrollArea>
//     </ConfigProvider>
//   );
// };

// export default PredictedDemand;




// import React, { useEffect, useState } from 'react';
// import { Table, Spin } from 'antd';
// import type { TableProps } from 'antd';
// import qs from 'qs';
// import { ScrollArea } from '@/components/ui/scroll-area'; // Ensure you import ScrollArea or replace with your scrollable component
// import "../index.css";

// interface ProductData {
//   key: React.Key;
//   ProductID: string;
//   Product: string;
//   PredictedDemand: number;
// }

// interface TableParams {
//   pagination?: TableProps<ProductData>['pagination'];
//   sortField?: string;
//   sortOrder?: string;
//   filters?: Record<string, string[]>;
// }

// const columns: TableProps<ProductData>['columns'] = [
//   {
//     title: 'Rank',
//     dataIndex: 'rank',
//     render: (_, __, index) => index + 1,
//     width: '10%',
//   },
//   {
//     title: 'Product ID',
//     dataIndex: 'ProductID',
//     width: '20%',
//   },
//   {
//     title: 'Product Name',
//     dataIndex: 'Product',
//     width: '40%',
//   },
//   {
//     title: 'Projected Demand',
//     dataIndex: 'PredictedDemand',
//     sorter: (a, b) => a.PredictedDemand - b.PredictedDemand,
//     width: '30%',
//   },
// ];

// // Function to handle API request parameters for pagination, sorting, and filters
// const getApiParams = (params: TableParams) => ({
//   pageSize: params.pagination?.pageSize,
//   page: params.pagination?.current,
//   ...params,
// });

// const PredictedDemand: React.FC = () => {
//   const [data, setData] = useState<ProductData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [tableParams, setTableParams] = useState<TableParams>({
//     pagination: {
//       current: 1,
//       pageSize: 10,
//     },
//   });

//   // Fetch data from the API
//   const fetchPredicted = async () => {
//     setLoading(true);
//     const username = localStorage.getItem("username");

//     try {
//       const response = await fetch(`https://restore-backend.onrender.com/api/DemandPrediction/prediction/${username}?${qs.stringify(getApiParams(tableParams))}`);
//       const result = await response.json();

//       // Map the result to match the table data structure
//       const mappedData = result.map((item: any, index: number) => ({
//         key: index,
//         ProductID: item.ProductID,
//         Product: item.Product,
//         PredictedDemand: item.PredictedDemand,
//       }));

//       setData(mappedData);
//       setTableParams({
//         ...tableParams,
//         pagination: {
//           ...tableParams.pagination,
//           total: result.totalCount || 200, // Update total based on API response
//         },
//       });
//     } catch (error) {
//       console.error('Failed to fetch predicted data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPredicted();
//   }, [tableParams.pagination?.current, tableParams.pagination?.pageSize, tableParams.sortOrder, tableParams.sortField]);

//   const handleTableChange: TableProps<ProductData>['onChange'] = (pagination, filters, sorter) => {
//     setTableParams({
//       pagination,
//       sortField: sorter.field as string,
//       sortOrder: sorter.order as string,
//       filters,
//     });

//     if (pagination.pageSize !== tableParams.pagination?.pageSize) {
//       setData([]); // Clear data on page size change
//     }
//   };

//   return (
//     <ScrollArea className="h-[90%] px-8">
//       {loading ? (
//         <div className="flex justify-center items-center h-full">
//           <Spin className="custom-spinner" size="large" />
//         </div>
//       ) : (
//         <Table<ProductData>
//           columns={columns}
//           rowKey={(record) => record.ProductID}
//           dataSource={data}
//           pagination={tableParams.pagination}
//           loading={loading}
//           onChange={handleTableChange}
//           className="text-base font-lato"
//           rowClassName={() => 'text-sm md:text-base'}
//           showSorterTooltip={{ title: 'Sort' }}
//         />
//       )}
//     </ScrollArea>
//   );
// };

// export default PredictedDemand;
