import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminSidebar from '../../components/AdminSidebar.jsx';
import DashboardPage from './DashboardPage.jsx';
import PlantsAdminPage from './PlantsAdminPage.jsx';
import CategoriesAdminPage from './CategoriesAdminPage.jsx';
import ImagesAdminPage from './ImagesAdminPage.jsx';

import '../../assets/styles/quantri.css';


function AdminLayout() {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="admin-content">
        <Routes>
          {/* Khi vào /admin, tự động chuyển đến /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          {/* Các route con của trang quản trị */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="plants" element={<PlantsAdminPage />} />
          <Route path="categories" element={<CategoriesAdminPage />} />
          <Route path="images" element={<ImagesAdminPage />} />
          
           {/* Route bắt lỗi 404 cho trang quản trị */}
          <Route path="*" element={<div className="content-page active"><h1>404: Trang quản trị không tồn tại</h1></div>} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminLayout;