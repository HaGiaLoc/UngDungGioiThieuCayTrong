// src/pages/TrangChu/CategoryPage.jsx

import React, { useState, useMemo } from 'react';
import PlantCard from '../../components/PlantCard.jsx';

// Dữ liệu giả lập cho tất cả các cây trong danh mục
// Khi có backend, bạn sẽ fetch (tải) danh sách này một lần khi trang được mở
const allPlants = [
  { id: 8, name: 'Cây Kim Ngân', description: 'Mang ý nghĩa may mắn, tài lộc, phù hợp để bàn làm việc.', category: 'de-ban', image: 'https://via.placeholder.com/300x250/90EE90/000000?text=Cây+Để+Bàn+1' },
  { id: 9, name: 'Cây Phát Lộc', description: 'Biểu tượng của sự may mắn, sức sống mãnh liệt, dễ chăm sóc.', category: 'phong-thuy', image: 'https://via.placeholder.com/300x250/8FBC8F/000000?text=Cây+Phong+Thủy+1' },
  { id: 10, name: 'Cây Thường Xuân', description: 'Leo bám đẹp mắt, tượng trưng cho tình yêu và sự trường tồn.', category: 'day-leo', image: 'https://via.placeholder.com/300x250/98FB98/000000?text=Cây+Dây+Leo+1' },
  { id: 11, name: 'Cây Lan Ý', description: 'Hoa trắng thanh khiết, sống tốt trong điều kiện ít ánh sáng.', category: 'ua-bong', image: 'https://via.placeholder.com/300x250/66CDAA/000000?text=Cây+Ưa+Bóng+1' },
  { id: 12, name: 'Xương Rồng Tai Thỏ', description: 'Hình dáng ngộ nghĩnh, dễ thương, chịu hạn cực tốt.', category: 'xuong-rong', image: 'https://via.placeholder.com/300x250/F4A460/000000?text=Xương+Rồng+1' },
  { id: 13, name: 'Sen Đá Kim Cương', description: 'Lá mọng nước, màu sắc đẹp, biểu tượng cho tình yêu vĩnh cửu.', category: 'sen-da', image: 'https://via.placeholder.com/300x250/B0E0E6/000000?text=Sen+Đá+1' }
];

function CategoryPage() {
  // Dùng useState để lưu trữ giá trị của các bộ lọc
  const [filters, setFilters] = useState({
    category: '',
    group: '',
    characteristic: '',
    shape: '',
    keyword: ''
  });

  // Hàm này sẽ được gọi mỗi khi giá trị của một bộ lọc thay đổi
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters, // Giữ lại giá trị của các bộ lọc khác
      [name]: value   // Cập nhật giá trị cho bộ lọc vừa thay đổi
    }));
  };

  // Dùng useMemo để chỉ tính toán lại danh sách cây khi filters hoặc allPlants thay đổi
  const filteredPlants = useMemo(() => {
    // Trong một ứng dụng thực tế, bạn sẽ viết logic lọc phức tạp ở đây
    // Ví dụ đơn giản: lọc theo category và keyword
    return allPlants.filter(plant => {
      const matchCategory = filters.category ? plant.category === filters.category : true;
      const matchKeyword = filters.keyword ? plant.name.toLowerCase().includes(filters.keyword.toLowerCase()) : true;
      return matchCategory && matchKeyword;
    });
  }, [filters]); // Phụ thuộc vào filters

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

        <section className="category-results">
          <h2>Kết quả lọc</h2>
          {/* Render có điều kiện: nếu có kết quả thì hiển thị, không thì báo */}
          {filteredPlants.length > 0 ? (
            <div className="plant-grid">
              {filteredPlants.map(plant => (
                <PlantCard
                  key={plant.id}
                  id={plant.id}
                  image={plant.image}
                  name={plant.name}
                  description={plant.description}
                />
              ))}
            </div>
          ) : (
            <div className="no-results-message" style={{ marginTop: '2rem', textAlign: 'center' }}>
              <p>Không tìm thấy cây nào phù hợp với tiêu chí của bạn.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default CategoryPage;