import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import PropTypes from 'prop-types';
import millify from 'millify';

Chartjs.register(LineElement, CategoryScale, LinearScale, PointElement);

function calculateTotalPricePerMonth(orders) {
  const totalPrices = Array.from({ length: 12 }, () => 0);
  orders?.forEach((order) => {
    if (order?.order_date && order?.price) {
      try {
        const orderDate = new Date(order.order_date);
        const monthIndex = orderDate.getMonth();
        const price = parseInt(order.price, 10);
        if (!isNaN(price)) {
          totalPrices[monthIndex] += price;
        }
      } catch (error) {
        console.error('Error processing order:', error);
      }
    } else {
      console.warn('Skipping invalid order:', order);
    }
  });
  return totalPrices;
}

const LineChart = ({ orders }) => {
  const [monthlyRev, setMonthlyRev] = useState([]);

  useEffect(() => {
    setMonthlyRev(calculateTotalPricePerMonth(orders));
  }, [orders]);

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: monthlyRev,
        backgroundColor: 'transparent',
        borderColor: '#2563EB',
        borderWidth: 2,
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        tension: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: (value) => millify(value),
        },
        grid: {
          borderDash: [10],
        },
      },
    },
  };

  return (
    <>
      <h3 style={{ color: '#64748B', fontSize: '15px', lineHeight: '24px' }}>
        Revenue over time
      </h3>
      <div
        className="chart-container"
        style={{marginLeft: '20px' }}
      >
        <Line data={data} options={options} />
      </div>
    </>
  );
};

LineChart.propTypes = {
  orders: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        // order_date: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      }),
    ),
    PropTypes.null,
  ]).isRequired,
};
export default LineChart;
