// src/pages/TrangChu/SearchPage.jsx

import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Tái sử dụng component PlantCard
import PlantCard from '../../components/PlantCard.jsx';

// Dữ liệu giả lập cho kết quả tìm kiếm
// Sau này, bạn sẽ gọi API để lấy dữ liệu thật dựa trên từ khóa
const sampleResults = [
  { id: 1, name: 'Cây Kim Tiền', description: 'Mang lại may mắn, tài lộc, dễ chăm sóc.', image: 'https://via.placeholder.com/300x250/90EE90/000000?text=Cây+Kim+Tiền' },
  { id: 2, name: 'Cây Lưỡi Hổ', description: 'Thanh lọc không khí hiệu quả, chịu hạn tốt.', image: 'https://via.placeholder.com/300x250/8FBC8F/000000?text=Cây+Lưỡi+Hổ' },
  { id: 3, name: 'Cây Trầu Bà', description: 'Dạng dây leo đẹp mắt, dễ trồng.', image: 'https://via.placeholder.com/300x250/98FB98/000000?text=Cây+Trầu+Bà' },
  { id: 7, name: 'Cây Kim Ngân', description: 'Biểu tượng cho sự giàu sang, phú quý.', image: 'https://via.placeholder.com/300x250/90EE90/000000?text=Cây+Kim+Ngân' }
];

function SearchPage() {
  // Hook của react-router-dom để đọc các tham số trên URL (ví dụ: ?keyword=...)
  const [searchParams] = useSearchParams();
  
  // Lấy giá trị của 'keyword' từ URL, nếu không có thì là chuỗi rỗng
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';

  // Logic để quyết định tiêu đề hiển thị
  let title = 'Tất cả sản phẩm';
  if (keyword) {
    title = `Hiển thị kết quả cho: "${keyword}"`;
  } else if (category) {
    title = `Kết quả cho danh mục: "${category}"`;
  }

  // Logic hiển thị: Nếu có kết quả thì hiện lưới cây, không thì hiện thông báo
  const hasResults = sampleResults.length > 0;

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
                {/* Dùng hàm .map() để lặp qua mảng dữ liệu và render component */}
                {sampleResults.map(plant => (
                  <PlantCard
                    key={plant.id} // key là bắt buộc và phải là duy nhất
                    id={plant.id}
                    image={plant.image}
                    name={plant.name}
                    description={plant.description}
                  />
                ))}
              </div>
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