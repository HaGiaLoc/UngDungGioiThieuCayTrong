import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../assets/images/logo.png";
import background from '../../assets/images/BackGround.jpg';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error("Sai tài khoản hoặc mật khẩu");
      const data = await res.json();
      localStorage.setItem("admin_token", data.token || data.accessToken);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="login-bg" style={{ background: `url(${background}) center/cover no-repeat, linear-gradient(120deg, #d4f5e9 0%, #b7e7c2 100%)` }}>
      <div className="login-container">
        <div className="login-left">
          <h2>Đăng Nhập Quản Trị</h2>
          <form onSubmit={handleSubmit}>
            <label>Tên đăng nhập hoặc email</label>
            <input type="text" placeholder="Nhập tên đăng nhập hoặc email" value={username} onChange={e => setUsername(e.target.value)} />
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <div style={{color:'red',margin:'8px 0'}}>{error}</div>}
            <button type="submit">Đăng Nhập</button>
          </form>
        </div>
        <div className="login-right">
          <img src={logo} alt="Green Garden" className="login-logo" />
          <h3>Green Garden</h3>
          <p>Hệ Thống Quản Trị Nội Dung</p>
        </div>
      </div>
    </div>
  );
}