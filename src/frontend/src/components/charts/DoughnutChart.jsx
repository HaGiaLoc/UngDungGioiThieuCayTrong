// src/components/charts/DoughnutChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChartComponent = () => {
  const data = {
    labels: ['Cây Trong Nhà', 'Cây Phong Thủy', 'Cây Ăn Quả', 'Cây Dây Leo'],
    datasets: [{
      label: 'Số lượng cây',
      data: [50, 35, 20, 23],
      backgroundColor: ['#2ecc71', '#ffc107', '#dc3545', '#17a2b8'],
      hoverOffset: 4,
    }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
  };
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChartComponent;