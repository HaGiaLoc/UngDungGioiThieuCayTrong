// src/pages/QuanTri/LoginPage.jsx
import React, { useEffect } from 'react';

import logoImage from '../../assets/images/logo.png'; 
import '../../assets/styles/quantri.css';

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  // Xử lý đăng nhập
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    // Luôn lưu vào localStorage
    // Nếu chưa có backend thực tế, mô phỏng đăng nhập thành công
    if (!API_URL) {
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('admin_token', 'demo_token');
        window.location.href = '/admin';
        return;
      } else {
        alert('Sai tài khoản hoặc mật khẩu');
        return;
      }
    }
    // Đăng nhập thực tế
    fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (!res.ok) throw new Error('Sai tài khoản hoặc mật khẩu');
        return res.json();
      })
      .then(data => {
        localStorage.setItem('admin_token', data.token);
        window.location.href = '/admin';
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="login-container" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#f5f7fa'}}>
      <div className="login-box custom-login-box">
        <div className="login-logo-area" style={{textAlign:'center',marginBottom:'2rem'}}>
          <div className="login-logo-placeholder" style={{marginBottom:'1rem'}}>
            <img src={logoImage} alt="Logo Green Garden" style={{width:'80px',height:'80px',objectFit:'contain',borderRadius:'50%',background:'#f0f0f0',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}} />
          </div>
          <h2 className="logo-title" style={{color:'#43d167',fontWeight:'bold',fontSize:'2rem',marginBottom:'0.5rem'}}>Green Garden</h2>
          <p className="logo-subtitle" style={{color:'#888',fontSize:'1.1rem'}}>Hệ Thống Quản Trị Nội Dung</p>
        </div>
        <div className="login-form-area">
          <h2 style={{textAlign:'center',marginBottom:'1.2rem'}}>Đăng Nhập Quản Trị</h2>
          <p className="subtitle" style={{textAlign:'center',color:'#666',marginBottom:'1.5rem'}}>Chào mừng trở lại! Vui lòng nhập thông tin.</p>
          <form id="login-form" onSubmit={handleLogin} autoComplete="on"> 
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập hoặc Email</label>
              <input type="text" id="username" name="username" required autoComplete="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input type="password" id="password" name="password" required autoComplete="current-password" />
            </div>
            <button type="submit" className="btn btn-primary custom-login-btn" style={{marginTop:'20px'}}>Đăng Nhập</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;