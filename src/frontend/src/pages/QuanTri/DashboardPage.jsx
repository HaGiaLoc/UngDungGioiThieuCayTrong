// src/pages/QuanTri/DashboardPage.jsx
import React from 'react';

// Import các component cần thiết từ thư mục components chung
import StatCard from '../../components/StatCard.jsx';
import BarChart from '../../components/charts/BarChart.jsx';
import DoughnutChart from '../../components/charts/DoughnutChart.jsx';

function DashboardPage() {
  return (
    <div id="dashboard" className="content-page active">
      <header className="content-header"><h1>Tổng quan</h1></header>
      
      <div className="overview-grid">
        <StatCard icon="fas fa-leaf" title="Tổng số cây" value="128" color="#36a2eb" bgColor="#eaf5ff" />
        <StatCard icon="fas fa-tags" title="Tổng danh mục" value="8" color="#2ecc71" bgColor="#e8f7f0" />
        <StatCard icon="fas fa-check-circle" title="Số cây đang hiển thị" value="110" color="#2ecc71" bgColor="#e8f7f0" />
        <StatCard icon="fas fa-eye-slash" title="Số cây đang ẩn" value="18" color="#ffc107" bgColor="#fff8e1" />
      </div>

      <div className="dashboard-charts">
        <section className="content-section chart-container">
          <h2>Thống kê cây được thêm theo tháng</h2>
          <div className="chart-wrapper">
            <BarChart />
          </div>
        </section>
        <section className="content-section chart-container">
          <h2>Tỉ lệ cây theo danh mục</h2>
          <div className="chart-wrapper">
            <DoughnutChart />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;