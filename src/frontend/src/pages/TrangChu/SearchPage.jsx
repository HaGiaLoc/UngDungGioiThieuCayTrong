// src/pages/TrangChu/SearchPage.jsx

import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Tái sử dụng component PlantCard
import PlantCard from '../../components/PlantCard.jsx';

const API_URL = import.meta.env.VITE_API_URL;

function SearchPage() {
  // Hook của react-router-dom để đọc các tham số trên URL (ví dụ: ?keyword=...)
  const [searchParams] = useSearchParams();
  
  // Lấy giá trị của 'keyword' từ URL, nếu không có thì là chuỗi rỗng
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';

  // Thêm state cho kết quả tìm kiếm
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = `${API_URL}/api/plants`;
    const params = [];
    if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);
    if (category) params.push(`category=${encodeURIComponent(category)}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
        return res.json();
      })
      .then(data => setResults(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [keyword, category]);

  // Logic để quyết định tiêu đề hiển thị
  let title = 'Tất cả sản phẩm';
  if (keyword) {
    title = `Hiển thị kết quả cho: "${keyword}"`;
  } else if (category) {
    title = `Kết quả cho danh mục: "${category}"`;
  }

  // Logic hiển thị: Nếu có kết quả thì hiện lưới cây, không thì hiện thông báo
  const hasResults = results.length > 0;

  return (
    // Phần header và footer đã được App.js quản lý, nên ta chỉ cần code phần main
    <main className="search-page-main">
      <div className="container">
        <h1>Kết quả tìm kiếm</h1>
        <div className="search-layout">
          {/* Sidebar Danh Mục */}
          <aside className="search-sidebar">
            <h3>Danh Mục Cây</h3>
            <nav className="category-list">
              <ul>
                {/* Dùng <Link> để điều hướng, sau này có thể làm active động */}
                <li><Link to="/tim-kiem">Tất cả cây</Link></li>
                <li><Link to="/tim-kiem?category=de-ban">Cây Để Bàn</Link></li>
                <li><Link to="/tim-kiem?category=phong-thuy">Cây Phong Thủy</Link></li>
                <li><Link to="/tim-kiem?category=thanh-loc">Cây Thanh Lọc Không Khí</Link></li>
                <li><Link to="/tim-kiem?category=day-leo">Cây Dây Leo</Link></li>
                <li><Link to="/tim-kiem?category=chiu-han">Cây Chịu Hạn</Link></li>
                <li><Link to="/tim-kiem?category=ua-bong">Cây Ưa Bóng</Link></li>
                <li><Link to="/tim-kiem?category=xuong-rong">Xương Rồng & Sen Đá</Link></li>
              </ul>
            </nav>
          </aside>

          {/* Khu vực hiển thị kết quả */}
          <section className="search-results">
            {/* Tiêu đề này giờ đã được làm động */}
            <h2>{title}</h2>

            {/* Dùng toán tử 3 ngôi để render có điều kiện */}
            {hasResults ? (
              <div className="plant-grid">
                {results.map(plant => (
                  <PlantCard
                    key={plant.id}
                    id={plant.id}
                    image={plant.image}
                    name={plant.name}
                    description={plant.description}
                  />
                ))}
              </div>
            ) : loading ? (
              <p>Đang tải dữ liệu...</p>
            ) : error ? (
              <p className="no-results">Lỗi: {error}</p>
            ) : (
              <p className="no-results">
                Rất tiếc, không tìm thấy cây nào phù hợp với tìm kiếm của bạn.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default SearchPage;