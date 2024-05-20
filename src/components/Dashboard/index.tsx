import React, { useEffect, useState } from 'react';
import { Divider, Select } from 'antd';
import LineChart from '../LineChart';
import styles from './index.module.scss';
import DoughnutChart from '../DoughnutChart';
import OrderTable from '../OrderTable';
import axios from 'axios';
import { NumericFormat } from 'react-number-format';

import millify from 'millify';

type Order = {
  order_number?: string;
  customer_name: string;
  product_name: string;
  product_category: string;
  price: string;
  order_date: string;
};

//total revenue
const calcTotalRev = (orders: any) => {
  let total = 0;
  orders?.map((order: any) => {
    console.log(order.price);
    total = total + Number(order.price);
  });
  console.log(total, 'toal rev in fcuntion');
  return total;
};

// total orders
const countTotalOrders = (orders: any): number => {
  let count = 0;
  orders?.forEach((order: any) => {
    count++;
  });
  return count;
};

//total number of unique customers
const countUniqueCustomers = (orders: any) => {
  const uniqueCustomers = new Set();

  orders?.forEach((order: any) => {
    uniqueCustomers.add(order.customer_name);
  });

  return uniqueCustomers.size;
};

//filtered total customers

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [filterSelected, setFilterSelected] = useState<string>('all_time');

  const { Option } = Select;

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/orders?time=${filterSelected}`,
        );
        setOrders(data.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchAllOrders();
  }, [filterSelected]);

  //calculate total revenue
  useEffect(() => {
    const totalRev = calcTotalRev(orders);
    setTotalRevenue(totalRev);
  }, [orders, filterSelected]);

  //total count of each category available
  useEffect(() => {
    if (!orders) return;

    const counts = orders.reduce(
      (acc, order) => {
        acc[order.product_category] = (acc[order.product_category] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number },
    );

    setCategoryCounts(counts);
  }, [orders]);

  //total number orders
  useEffect(() => {
    const ordersVal = countTotalOrders(orders);
    setTotalOrders(ordersVal);
  }, [orders]);

  //count unique customers
  useEffect(() => {
    const uniqueCustomers = countUniqueCustomers(orders);
    setTotalCustomers(uniqueCustomers);
  }, [orders]);

  const {
    Drama = 0,
    Horror = 0,
    Comedy = 0,
    Documentary = 0,
    'Sci-Fi': SciFi = 0,
  } = categoryCounts;

  const handleFilterSelected = (value: any) => {
    setFilterSelected(value);
  };

  return (
    <section className={styles.dashboard}>
      <div className={styles['dashboard__title-section']}>
        <div>
          <h3>Welcome, Matthew</h3>
          <p>Monday, 05 August 2022</p>
        </div>
        <div>
          <Select defaultValue="All Time" onChange={handleFilterSelected}>
            <Option value="this_month">This Month</Option>
            <Option value="last_month">Last Month</Option>
            <Option value="this_year">This Year</Option>
            <Option value="last_year">Last Year</Option>
            <Option value="all_time">All Time</Option>
          </Select>
        </div>
      </div>
      <div className={styles['dashboard__stats-section']}>
        <div className={styles['dashboard__stats-section__stat']}>
          <p>Total Revenue</p>
          <div>
            {' '}
            <NumericFormat
              value={totalRevenue}
              displayType="text"
              prefix="$"
              thousandSeparator={true}
            />
          </div>

          {/* ;<div>${totalRevenue}</div> */}
        </div>

        <Divider
          type="vertical"
          className={styles['dashboard__stats-section__divider']}
        />
        <div className={styles['dashboard__stats-section__stat']}>
          <p>Orders</p>
          <div>{totalOrders}</div>
        </div>

        <Divider
          type="vertical"
          className={styles['dashboard__stats-section__divider']}
        />

        <div className={styles['dashboard__stats-section__stat']}>
          <p>Customers</p>
          <div>{totalCustomers}</div>
        </div>
      </div>
      <div className={styles['dashboard__charts-section']}>
        <div className={styles['dashboard__charts-section__line']}>
          <LineChart orders={orders} />
        </div>
        <div className={styles['dashboard__charts-section__doughnut']}>
          <DoughnutChart
            drama={Drama}
            horror={Horror}
            scifi={SciFi}
            comedy={Comedy}
            docu={Documentary}
            totalOrders={totalOrders}
          />
        </div>
      </div>
      <div className={styles['dashboard__table-section']}>
        <OrderTable orders={orders} />
      </div>
    </section>
  );
};

export default Dashboard;
