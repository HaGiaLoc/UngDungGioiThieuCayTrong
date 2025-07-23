import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/TrangChu/HomePage.jsx';
import SearchPage from './pages/TrangChu/SearchPage.jsx';
import CategoryPage from './pages/TrangChu/CategoryPage.jsx';
import DetailPage from './pages/TrangChu/DetailPage.jsx';
import AdminLayout from './pages/QuanTri/AdminLayout.jsx';

import LoginPage from './pages/QuanTri/LoginPage.jsx';

const UserLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin/*" element={<AdminLayout />} />

        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tim-kiem" element={<SearchPage />} />
          <Route path="/danh-muc" element={<CategoryPage />} />
          <Route path="/chi-tiet/:plantId" element={<DetailPage />} />
        </Route>

        <Route path="*" element={<div style={{textAlign: 'center', padding: '4rem'}}><h1>404: Trang không tồn tại</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;