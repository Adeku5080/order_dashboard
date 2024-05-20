import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss'

type OrderTableProps = {
  orders: any;
};

//format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust options as needed
};



const OrderTable = ({ orders }: OrderTableProps) => {
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>(
    'checkbox',
  );


  interface OrderDataType {
    customer_name: string;
    product_name: string;
    product_category: string;
    order_date: string;
    price: string;
  }
  const orderColumnData: ColumnsType<OrderDataType> = [
    {
      title: 'Customer name',
      dataIndex: 'customer_name',
      key: 'customer_name',
      render: (_, record) => {
        return <div>{record.customer_name}</div>;
      },
    },

    {
      title: 'Product name',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (_, record) => {
        return <div>{record.product_name}</div>;
      },
    },

    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => {
        return <div>{record.product_category}</div>;
      },
    },

    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => {
        return (
          <div>{record.order_date ? formatDate(record.order_date) : '-'}</div>
        );
      },
    },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => {
        return <div>{record.price}</div>;
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: OrderDataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    getCheckboxProps: (record: OrderDataType) => ({
      disabled: record.customer_name === 'Disabled User',
      name: record.customer_name,
    }),
  };

  return (
    <div>
      <Table
        className={styles['custom-table']}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        dataSource={orders}
        columns={orderColumnData}
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
};

export default OrderTable;
