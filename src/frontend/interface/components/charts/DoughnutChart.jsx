import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const COLORS = [
  '#2ecc71', '#ffc107', '#dc3545', '#17a2b8', '#8e44ad', '#e67e22', '#00b894', '#fd79a8', '#636e72', '#00cec9', '#fdcb6e', '#6c5ce7'
];
const DoughnutChartComponent = ({ data }) => {
  const labels = Array.isArray(data) ? data.map(item => item.category) : [];
  const values = Array.isArray(data) ? data.map(item => item.count) : [];
  const chartData = {
    labels,
    datasets: [{
      label: 'Số lượng cây',
      data: values,
      backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
      hoverOffset: 4,
    }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
  };
  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChartComponent;