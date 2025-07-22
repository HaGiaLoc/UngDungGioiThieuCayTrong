// src/pages/TrangChu/CategoryPage.jsx

import React, { useState, useMemo, useEffect } from 'react';
import PlantCard from '../../components/PlantCard.jsx';

const API_URL = import.meta.env.VITE_API_URL;

function CategoryPage() {
  // Dùng useState để lưu trữ giá trị của các bộ lọc
  const [filters, setFilters] = useState({
    category: '',
    group: '',
    characteristic: '',
    shape: '',
    keyword: ''
  });

  // Thêm state cho danh sách cây
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = `${API_URL}/api/plants`;
    const params = [];
    if (filters.category) params.push(`category=${encodeURIComponent(filters.category)}`);
    if (filters.keyword) params.push(`keyword=${encodeURIComponent(filters.keyword)}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
        return res.json();
      })
      .then(data => setPlants(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [filters]);

  // Hàm này sẽ được gọi mỗi khi giá trị của một bộ lọc thay đổi
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters, // Giữ lại giá trị của các bộ lọc khác
      [name]: value   // Cập nhật giá trị cho bộ lọc vừa thay đổi
    }));
  };

  // Dùng useMemo để chỉ tính toán lại danh sách cây khi filters hoặc allPlants thay đổi
  const filteredPlants = plants.filter(plant => plant.status === 'Hiển thị');

  return (
    <main className="category-main">
      <div className="container">
        <h1>Khám Phá Các Loại Cây</h1>

        <div className="filters-container">
          {/* Mỗi bộ lọc sẽ được kết nối với state 'filters' */}
          <div className="filter-group">
            <label htmlFor="category-filter">Danh mục:</label>
            <select name="category" id="category-filter" value={filters.category} onChange={handleFilterChange}>
              <option value="">-- Tất cả danh mục --</option>
              <option value="de-ban">Cây Để Bàn</option>
              <option value="phong-thuy">Cây Phong Thủy</option>
              <option value="day-leo">Cây Dây Leo</option>
              <option value="ua-bong">Cây Ưa Bóng</option>
              <option value="xuong-rong">Xương Rồng</option>
              <option value="sen-da">Sen Đá</option>
            </select>
          </div>

          {/* Các bộ lọc khác tương tự */}
          <div className="filter-group">
            <label htmlFor="group-filter">Nhóm cây:</label>
            <select name="group" id="group-filter" value={filters.group} onChange={handleFilterChange}>
              <option value="">-- Chọn nhóm cây --</option>
              {/* ...các option khác... */}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="characteristic-filter">Theo đặc tính:</label>
            <select name="characteristic" id="characteristic-filter" value={filters.characteristic} onChange={handleFilterChange}>
              <option value="">-- Chọn đặc tính --</option>
              {/* ...các option khác... */}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="shape-filter">Theo hình dáng:</label>
            <select name="shape" id="shape-filter" value={filters.shape} onChange={handleFilterChange}>
              <option value="">-- Chọn hình dáng --</option>
              {/* ...các option khác... */}
            </select>
          </div>

          <div className="category-search-bar">
            <input 
              type="search" 
              name="keyword" 
              placeholder="Tìm trong danh mục..."
              value={filters.keyword}
              onChange={handleFilterChange}
            />
            {/* Nút tìm kiếm có thể dùng để kích hoạt bộ lọc thay vì lọc ngay lập tức */}
            <button type="button">Tìm</button>
          </div>
        </div>

        <section className="category-results" style={{border: '30px solid #f0f2f5', borderRadius: '20px', marginTop: '2rem', background: '#fff'}}>
          <h2>Kết quả lọc</h2>
          {/* Render có điều kiện: nếu có kết quả thì hiển thị, không thì báo */}
          {filteredPlants.length > 0 ? (
            <div className="plant-grid" style={{gridTemplateColumns: 'repeat(5, 1fr)'}}>
              {filteredPlants.slice(0, 50).map(plant => (
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
            <p className="no-results">Không tìm thấy cây nào phù hợp.</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default CategoryPage;