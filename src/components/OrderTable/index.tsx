import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

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
    icon: string;
  }
  const orderColumnData: ColumnsType<OrderDataType> = [
    {
      title: (
        <div style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>
          Customer name
        </div>
      ),
      dataIndex: 'customer_name',
      key: 'customer_name',
      render: (_, record) => {
        return (
          <div
            style={{ fontWeight: '600', fontSize: '12px', color: '#0f172a' }}
          >
            {record.customer_name}
          </div>
        );
      },
    },

    {
      title: (
        <div style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>
          Product name
        </div>
      ),
      dataIndex: 'product_name',
      key: 'product_name',
      render: (_, record) => {
        return (
          <div
            style={{ fontWeight: '600', fontSize: '12px', color: '#0f172a' }}
          >
            {record.product_name}
          </div>
        );
      },
    },

    {
      title: (
        <div style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>
          Category
        </div>
      ),
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => {
        return (
          <div
            style={{ fontWeight: '600', fontSize: '12px', color: '#0f172a' }}
          >
            {record.product_category}
          </div>
        );
      },
    },

    {
      title: (
        <div style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>
          Date
        </div>
      ),
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => {
        return (
          <div
            style={{ fontWeight: '600', fontSize: '12px', color: '#0f172a' }}
          >
            {' '}
            {record.order_date ? formatDate(record.order_date) : '-'}
          </div>
        );
      },
    },

    {
      title: (
        <div style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>
          Price
        </div>
      ),
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => {
        return (
          <div
            style={{ fontWeight: '600', fontSize: '12px', color: '#0f172a' }}
          >
            {record.price}
          </div>
        );
      },
    },
    {
      title: (
        <div style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>
          <img src='/dots.svg' alt='icon'/>
        </div>
      ),
      dataIndex: 'Icon',
      key: 'Icon',
      render: (_, record) => {
        return (
          <div
            style={{ fontWeight: '600', fontSize: '12px', color: '#0f172a' }}
          >
            <img src="/dots.svg" alt="icon" />
          </div>
        );
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
