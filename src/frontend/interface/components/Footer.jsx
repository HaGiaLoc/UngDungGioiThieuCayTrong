import React from 'react';
import { Link } from 'react-router-dom';

import zaloIcon from '../assets/images/zalo02.png';
import facebookIcon from '../assets/images/facebook02.png';
import instagramIcon from '../assets/images/Instagram02.png';

import mapIcon from '../assets/images/map-marker-icon2.png';
import emailIcon from '../assets/images/envelope-icon2.png';
import phoneIcon from '../assets/images/phone-icon2.png';

function Footer() {
  return (
    <footer>
      <div className="container footer-container">
        <div className="footer-column">
          <h4>🌿Green Garden</h4>
          <p>Mang thiên nhiên vào ngôi nhà của bạn. Khám phá và chăm sóc cây cảnh cùng chúng tôi.</p>
        </div>
        <div className="footer-column">
          <h4>Liên Kết Nhanh</h4>
          <ul>
            <li><Link to="/">Trang Chủ</Link></li>
            <li><Link to="/danh-muc">Danh Mục</Link></li>
            <li><a href="#about">Về Chúng Tôi</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Liên Hệ</h4>
          <ul className="social-links-list">
            <li>
              <img src={mapIcon} alt="Địa chỉ" className="social-icon" />
                Càng Long, Trà Vinh
            </li>
            <li>
              <a href="mailto:greengarden@gmail.com">
                <img src={emailIcon} alt="Email" className="social-icon" />
                  greengarden@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:0123456789">
                <img src={phoneIcon} alt="Điện thoại" className="social-icon" />
                  0123 456 789
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Kết Nối Với Chúng Tôi</h4>
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
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Green Garden. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
}

export default Footer;