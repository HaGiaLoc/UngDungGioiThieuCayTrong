import React from 'react';
import { Link } from 'react-router-dom';

// Import hình ảnh từ thư mục assets
import zaloIcon from '../assets/images/zalo02.png';
import facebookIcon from '../assets/images/facebook02.png';
import instagramIcon from '../assets/images/Instagram02.png';

function Header() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          {/* Dùng Link của react-router-dom để điều hướng nội bộ */}
          <Link to="/">🌿Green Garden</Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Trang Chủ</Link></li>
            <li className="dropdown">
              <Link to="/danh-muc" className="dropdown-toggle">Danh Mục ▾</Link>
              <ul className="dropdown-menu">
                {/* Thay đổi các link để phù hợp với routing của React */}
                <li><Link to="/tim-kiem?category=de-ban">Cây Để Bàn</Link></li>
                <li><Link to="/tim-kiem?category=phong-thuy">Cây Phong Thủy</Link></li>
                <li><Link to="/tim-kiem?category=day-leo">Cây Dây Leo</Link></li>
                <li><Link to="/tim-kiem?category=ua-bong">Cây Ưa Bóng</Link></li>
                <li><Link to="/tim-kiem?category=xuong-rong">Xương Rồng</Link></li>
                <li><Link to="/tim-kiem?category=sen-da">Sen Đá</Link></li>
              </ul>
            </li>
            {/* Các link dạng # có thể giữ nguyên thẻ a */}
            <li><a href="#featured-plants">Cây Nổi Bật</a></li>
            <li><a href="#about">Về Chúng Tôi</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle">Liên Hệ ▾</a>
              <ul className="dropdown-menu">
                <ul className="social-links-list">
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img src={zaloIcon} alt="Zalo" className="social-icon" />
                      Zalo
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img src={facebookIcon} alt="Facebook" className="social-icon" />
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img src={instagramIcon} alt="Instagram" className="social-icon" />
                      Instagram
                    </a>
                  </li>
                </ul>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;