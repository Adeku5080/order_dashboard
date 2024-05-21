import React from 'react';
import {
  Chart as Chartjs,
  ArcElement,
  Tooltip,
  Legend,
  Plugin,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

Chartjs.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ scifi, drama, horror, docu, comedy, totalOrders }) => {
  const data = {
    labels: ['SCI-Fi', 'Drama', 'Comedy', 'Horror', 'Docu'],
    datasets: [
      {
        data: [scifi, drama, comedy, horror, docu],
        backgroundColor: [
          '#2563EB',
          '#64748B',
          '#25DFEB',
          '#D8DB4C',
          '#EB2555',
        ],
        hoverBackgroundColor: [
          '#2563EB',
          '#64748B',
          '#25DFEB',
          '#D8DB4C',
          '#EB2555',
        ],
      },
    ],
  };

  const testOrder = '10';
  
  const innerLabel = {
    id: 'innerLabel',
    afterDatasetsDraw(chart) {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;
      console.log(totalOrders.toString(), 'orders in doughnut');
      const text = testOrder;

      ctx.save();
      ctx.font = '32px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);
      ctx.restore();
    },
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      innerLabel,
    },
  };

  return (
    <>
      <h3
        style={{
          color: '#64748B',
          fontSize: '15px',
          lineHeight: '24px',
          fontWeight: '700',
          fontFamily: 'Inter',
        }}
      >
        Orders by Categories
      </h3>
      <div style={{ width: '80%', height: '85%' }}>
        <Doughnut data={data} options={options} plugins={[innerLabel]} />
      </div>
    </>
  );
};

DoughnutChart.propTypes = {
  scifi: PropTypes.number,
  drama: PropTypes.number,
  horror: PropTypes.number,
  comedy: PropTypes.number,
  docu: PropTypes.number,
  totalOrders: PropTypes.number,
};

DoughnutChart.defaultProps = {
  scifi: 0,
  drama: 0,
  horror: 0,
  comedy: 0,
  docu: 0,
  totalOrders: 0,
};

export default DoughnutChart;
