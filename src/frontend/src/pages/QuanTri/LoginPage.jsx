// src/pages/QuanTri/LoginPage.jsx
import React, { useEffect } from 'react';

// ✅ ĐƯỜNG DẪN ĐÃ THAY ĐỔI: Thêm một "../"
import logoImage from '../../assets/images/logo.png'; 
import '../../assets/styles/quantri.css';

function LoginPage() {
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form-area">
          <h2>Đăng Nhập Quản Trị</h2>
          <p className="subtitle">Chào mừng trở lại! Vui lòng nhập thông tin.</p>
          <form id="login-form"> 
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập hoặc Email</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="login-options">
              <div className="form-check">
                <input type="checkbox" id="remember-me" name="remember_me" />
                <label htmlFor="remember-me">Ghi nhớ đăng nhập</label>
              </div>
              <div className="forgot-password">
                <a href="#">Quên mật khẩu?</a>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Đăng Nhập</button>
          </form>
        </div>
        <div className="login-logo-area">
          <div className="login-logo-placeholder">
            <img src={logoImage} alt="Logo Green Garden" /> 
          </div>
          <h2 className="logo-title">Green Garden</h2>
          <p className="logo-subtitle">Hệ Thống Quản Trị Nội Dung</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;