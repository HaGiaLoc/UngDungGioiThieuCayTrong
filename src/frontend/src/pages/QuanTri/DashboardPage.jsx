// src/pages/QuanTri/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard.jsx';
import BarChart from '../../components/charts/BarChart.jsx';
import DoughnutChart from '../../components/charts/DoughnutChart.jsx';

const API_URL = import.meta.env.VITE_API_URL;

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Kiểm tra token đăng nhập
  useEffect(() => {
    const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/api/statistics`)
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
        return res.json();
      })
      .then(data => setStats(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div id="dashboard" className="content-page active" style={{padding:'20px'}}>
      <header className="content-header" style={{padding:'20px 0 30px 0', marginBottom:'20px', background:'#fff', borderRadius:'12px', boxShadow:'0 2px 12px rgba(0,0,0,0.07)'}}>
        <h1 style={{color:'#2d3a4a', fontWeight:'bold', fontSize:'2.2rem', margin:'0'}}>Tổng quan</h1>
      </header>
      {loading ? (
        <div style={{textAlign:'center', color:'#888', fontSize:'1.1rem'}}>Đang tải dữ liệu...</div>
      ) : error ? (
        <div style={{textAlign:'center', color:'red', fontSize:'1.1rem'}}>Lỗi: {error}</div>
      ) : stats ? (
        <>
          <div className="overview-grid" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'2rem', marginBottom:'2.5rem'}}>
            <StatCard icon="fas fa-leaf" title="Tổng số cây" value={stats.totalPlants} color="#36a2eb" bgColor="#eaf5ff" />
            <StatCard icon="fas fa-tags" title="Tổng danh mục" value={stats.totalCategories} color="#2ecc71" bgColor="#e8f7f0" />
            <StatCard icon="fas fa-check-circle" title="Số cây đang hiển thị" value={stats.visiblePlants} color="#2ecc71" bgColor="#e8f7f0" />
            <StatCard icon="fas fa-eye-slash" title="Số cây đang ẩn" value={stats.hiddenPlants} color="#ffc107" bgColor="#fff8e1" />
          </div>
          <div className="dashboard-charts" style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:'2rem'}}>
            <section className="content-section chart-container" style={{background:'#fff',borderRadius:'12px',boxShadow:'0 2px 12px rgba(0,0,0,0.07)',padding:'2rem'}}>
              <h2 style={{fontSize:'1.2rem',marginBottom:'1rem',color:'#2d3a4a',fontWeight:'bold'}}>Thống kê cây được thêm theo tháng</h2>
              <div className="chart-wrapper">
                <BarChart data={stats.plantsByMonth} />
              </div>
            </section>
            <section className="content-section chart-container" style={{background:'#fff',borderRadius:'12px',boxShadow:'0 2px 12px rgba(0,0,0,0.07)',padding:'2rem'}}>
              <h2 style={{fontSize:'1.2rem',marginBottom:'1rem',color:'#2d3a4a',fontWeight:'bold'}}>Tỉ lệ cây theo danh mục</h2>
              <div className="chart-wrapper">
                <DoughnutChart data={stats.plantsByCategory} />
              </div>
            </section>
          </div>
        </>
      ) : (
        <div style={{textAlign:'center', color:'#888', fontSize:'1.1rem'}}>Không có dữ liệu.</div>
      )}
    </div>
  );
}

export default DashboardPage;