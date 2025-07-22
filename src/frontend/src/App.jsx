// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// --- Import các component và trang ---
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/TrangChu/HomePage.jsx';
import SearchPage from './pages/TrangChu/SearchPage.jsx';
import CategoryPage from './pages/TrangChu/CategoryPage.jsx';
import DetailPage from './pages/TrangChu/DetailPage.jsx';
import AdminLayout from './pages/QuanTri/AdminLayout.jsx';

// ✅ ĐƯỜNG DẪN ĐÃ THAY ĐỔI: Trỏ vào thư mục QuanTri
import LoginPage from './pages/QuanTri/LoginPage.jsx';

// Component layout chung cho trang người dùng
const UserLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

// Component App chính để quản lý toàn bộ routing
function App() {
  return (
    <Router>
      <Routes>
        {/* Route cho trang đăng nhập (layout riêng) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route cho trang quản trị (layout riêng) */}
        <Route path="/admin/*" element={<AdminLayout />} />

        {/* Các route cho trang người dùng sẽ sử dụng UserLayout chung */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chi-tiet/:plantId" element={<DetailPage />} />
        </Route>

        {/* Route bắt lỗi 404 chung cho toàn bộ ứng dụng */}
        <Route path="*" element={<div style={{textAlign: 'center', padding: '4rem'}}><h1>404: Trang không tồn tại</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;