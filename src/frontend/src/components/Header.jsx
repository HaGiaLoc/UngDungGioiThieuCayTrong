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
          <Link to="/">��Green Garden</Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Trang Chủ</Link></li>
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