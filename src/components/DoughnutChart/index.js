import React from 'react';
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

Chartjs.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ scifi, drama, horror, docu, comedy, totalOrders }) => {
  const data = {
    labels: ['SCI-Fi', ' Drama', 'Comedy', 'Horror', 'Docu'],

    datasets: [
      {
        data: [scifi, drama, comedy, horror, docu],
        backgroundColor: [
          '#2563EB',
          '#64748B',
          ' #25DFEB',
          '#D8DB4C',
          '#EB2555',
        ],
        hoverBackgroundColor: [
          '#2563EB',
          '#64748B',
          ' #25DFEB',
          '#D8DB4C',
          '#EB2555',
        ],
      },
    ],
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: ['green', 'white', 'red'],
        precision: 2,
      },
    },
    text: '23%',
  };

  const CenterTextPlugin = {
    beforeDraw: function (chart) {
      const width = chart.chart.width;
      const height = chart.chart.height;
      const ctx = chart.chart.ctx;

      ctx.restore();
      const fontSize = (height / 114).toFixed(2);
      ctx.font = fontSize + 'em sans-serif';
      ctx.textBaseline = 'middle';

      const text = chart.config.options.elements.center.text;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };

  const doughnutLabelPlugin = {
    id: 'doughnutLabel',
    beforeDraw: function (chart) {
      const { ctx, chartArea } = chart;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;

      ctx.save();
      ctx.font = 'bold 30px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Text', centerX, centerY);
      ctx.restore();
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
        Order by categories
      </h3>
      <div style={{ width: '80%', height: '85%' }}>
        <Doughnut
          data={data}
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'right',
              },
              doughnutLabelPlugin: doughnutLabelPlugin,
              CenterTextPlugin: CenterTextPlugin,
            },
            elements: {
              center: {
                legend: { display: true, position: 'bottom' },
                text: 'Red is 2/3 the total numbers',
                color: '#FF6384', // Default is #000000
                fontStyle: 'Arial', // Default is Arial
                sidePadding: 20, // Default is 20 (as a percentage)
                minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
                lineHeight: 25, // Default is 25 (in px), used for when text wraps
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default DoughnutChart;

DoughnutChart.propTypes = {
  scifi: PropTypes.number,
  drama: PropTypes.number,
  horror: PropTypes.number,
  comedy: PropTypes.number,
  docu: PropTypes.number,
  totalOrders: PropTypes.number,
};

// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import PropTypes from 'prop-types';
// import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js';

// const DoughnutChart = ({ scifi, drama, horror, docu, comedy, totalOrders }) => {
//   const data = {
//     labels: ['SCI-fi', 'Drama', 'Comedy', 'Horror', 'Docu'],
//     datasets: [
//       {
//         data: [scifi, drama, comedy, horror, docu],
//         backgroundColor: [
//           '#2563EB',
//           '#64748B',
//           '#25DFEB',
//           '#D8DB4C',
//           '#EB2555',
//         ],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//       },
//     ],
//   };

//   // const centerTextPlugin = {
//   //   afterDraw: (chart) => {
//   //     const { ctx, width: chartWidth, height: chartHeight } = chart.chart;

//   //     const {
//   //       datasets: [dataset],
//   //     } = chart.config.data;

//   //     const { circumference, centerX, centerY } = chart.chart;

//   //     const { total } = dataset.data.reduce(
//   //       (acc, val) => {
//   //         acc.total += val;
//   //         return acc;
//   //       },
//   //       { total: 0 },
//   //     );

//   //     const text = 'Total: ' + total; // Text to display

//   //     ctx.fillStyle = '#000';
//   //     ctx.textBaseline = 'middle';
//   //     ctx.font = '15px Arial';
//   //     ctx.fillText(text, centerX, centerY);
//   //   },
//   // };

//   // const doughnutLabel = {
//   //   id: 'doughnutLabel',
//   //   afterDatasetsDraw(chart, args, plugins) {
//   //     const { ctx, data } = chart;

//   //     const centerX = chart.getDatasetMeta(0).data(0).x;
//   //     const centerY = chart.getDatasetMeta(0).data(0).y;

//   //     ctx.save();
//   //     const font = 'bold 90px sans-serif';
//   //     ctx.fillStyle = 'block';
//   //     ctx.fillText('Text', centerX, centerY);
//   //   },
//   // };

//   return (
//     <>
//       <h3 style={{ color: '#64748B', fontSize: '15px', lineHeight: '24px' }}>
//         Order by categories
//       </h3>
//       <div style={{ width: '80%', height: '80%' }}>
//         <Doughnut
//           data={data}
//           options={{
//             plugins: {
//               legend: {
//                 display: true,
//                 position: 'right',
//               },
//              // Register the plugin
//               // doughnutLabel,
//             },
//           }}
//         />
//       </div>
//     </>
//   );
// };

// export default DoughnutChart;

// DoughnutChart.propTypes = {
//   scifi: PropTypes.number,
//   drama: PropTypes.number,
//   horror: PropTypes.number,
//   comedy: PropTypes.number,
//   docu: PropTypes.number,
//   totalOrders: PropTypes.number,
// };
