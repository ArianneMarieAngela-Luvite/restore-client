// import React from 'react';
// import { Table } from 'antd';
// import type { TableColumnsType, TableProps } from 'antd';

// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

// const columns: TableColumnsType<DataType> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     showSorterTooltip: { target: 'full-header' },
//     filters: [
//       {
//         text: 'Joe',
//         value: 'Joe',
//       },
//       {
//         text: 'Jim',
//         value: 'Jim',
//       },
//       {
//         text: 'Submenu',
//         value: 'Submenu',
//         children: [
//           {
//             text: 'Green',
//             value: 'Green',
//           },
//           {
//             text: 'Black',
//             value: 'Black',
//           },
//         ],
//       },
//     ],
//     // specify the condition of filtering result
//     // here is that finding the name started with `value`
//     onFilter: (value, record) => record.name.indexOf(value as string) === 0,
//     sorter: (a, b) => a.name.length - b.name.length,
//     sortDirections: ['descend'],
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     defaultSortOrder: 'descend',
//     sorter: (a, b) => a.age - b.age,
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     filters: [
//       {
//         text: 'London',
//         value: 'London',
//       },
//       {
//         text: 'New York',
//         value: 'New York',
//       },
//     ],
//     onFilter: (value, record) => record.address.indexOf(value as string) === 0,
//   },
// ];

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];

// const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
//   console.log('params', pagination, filters, sorter, extra);
// };

// const PredictedDemand: React.FC = () => (
//   <Table<DataType>
//     columns={columns}
//     dataSource={data}
//     onChange={onChange}
//     showSorterTooltip={{ target: 'sorter-icon' }}
//   />
// );

// export default PredictedDemand;


import React, { useEffect, useState } from 'react';
import { Table, Spin } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { ScrollArea } from '@/components/ui/scroll-area'; // Ensure you import ScrollArea or replace with your scrollable component
import "../index.css";

interface ProductData {
  key: React.Key;
  ProductID: string;
  Product: string;
  PredictedDemand: number;
}

const columns: TableColumnsType<ProductData> = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    // render: (text, record, index) => index + 1,
    render: ( index) => index + 1,
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
    width: '30%',
  },
];



const PredictedDemand: React.FC = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchPredicted = async () => {
        const username = localStorage.getItem("username");
      try {
        const response = await fetch(`https://restore-backend.onrender.com/api/DemandPrediction/prediction/${username}`); // Replace with your API endpoint
        const result = await response.json();
        // Map the result to match the table data structure
        const mappedData = result.map((item: any, index: number) => ({
          key: index,
          ProductID: item.ProductID,
          Product: item.Product, // Assuming this comes from the response
          PredictedDemand: item.PredictedDemand,
        }));
        setData(mappedData);
      } catch (error) {
        console.error('Failed to fetch predicted data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredicted();
  }, []);

  const onChange: TableProps<ProductData>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <ScrollArea className="h-[90%] px-8">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin className='custom-spinner' size="large"/>
        </div>
      ) : (
        <Table<ProductData>
          id="productDemand"
          columns={columns}
          dataSource={data}
          onChange={onChange}
          pagination={{ pageSize: 6 }}  // Adjust pagination as needed
          className="text-base font-lato"
          rowClassName={() => 'text-sm md:text-base'}  // Custom row styling
          showSorterTooltip={{ target: 'sorter-icon' }}  // Tooltip for sorters
        />
      )}
    </ScrollArea>
  );
};

export default PredictedDemand;
