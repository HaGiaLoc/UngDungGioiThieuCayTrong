// src/components/charts/BarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ data }) => {
  const chartData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [{
      label: 'Số cây mới',
      data: Array.isArray(data) && data.length === 12 ? data : Array(12).fill(0),
      backgroundColor: 'rgba(46, 204, 113, 0.6)',
      borderColor: 'rgba(46, 204, 113, 1)',
      borderWidth: 1,
    }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, ticks: { stepSize: 5 } } },
  };
  return <Bar data={chartData} options={options} />;
};

export default BarChartComponent;