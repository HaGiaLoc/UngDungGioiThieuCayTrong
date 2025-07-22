import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import hình ảnh từ thư mục assets
import zaloIcon from '../assets/images/zalo02.png';
import facebookIcon from '../assets/images/facebook02.png';
import instagramIcon from '../assets/images/Instagram02.png';

function Header() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.filter(c => c.status === 'Hiển thị')))
      .catch(() => setCategories([]));
  }, []);

  // Hàm xử lý việc tìm kiếm
  const handleSearch = (event) => {
    event.preventDefault(); // Ngăn form reload lại trang
    const keyword = event.target.elements.keyword.value;
    if (keyword) {
      navigate(`/tim-kiem?keyword=${keyword}`); // Điều hướng đến trang tìm kiếm với query
    }
  };

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
              <Link to="/tim-kiem" className="dropdown-toggle">Danh Mục ▾</Link>
              <ul className="dropdown-menu">
                {categories.map(cat => (
                  <li key={cat.id}><Link to={`/tim-kiem?category=${encodeURIComponent(cat.name)}`}>{cat.name}</Link></li>
                ))}
              </ul>
            </li>
            {/* Các link dạng # có thể giữ nguyên thẻ a */}
            <li><a href="/#featured-plants">Cây Nổi Bật</a></li>
            <li><a href="/#about">Về Chúng Tôi</a></li>
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
        <div className="search-bar">
          {/* Thay thế form action bằng hàm onSubmit của React */}
          <form onSubmit={handleSearch} style={{ display: 'contents' }}>
            <input type="search" name="keyword" placeholder="Tìm kiếm cây..." />
            <button type="submit">🔍</button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;