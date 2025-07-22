// src/pages/TrangChu/DetailPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Import hình ảnh (giả sử bạn đã đặt chúng trong assets)
import kimTienImg from '../../assets/images/Kt.jpg';
import luoiHoImg from '../../assets/images/Lh.jpg';
import trauBaImg from '../../assets/images/Tb.jpg';

const API_URL = import.meta.env.VITE_API_URL;

function DetailPage() {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/api/plants/${plantId}`)
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
        return res.json();
      })
      .then(data => setPlant(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [plantId]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!plant) return <p>Không tìm thấy cây.</p>;

  // Nếu tìm thấy cây, render ra giao diện chi tiết
  return (
    <main className="product-detail-main">
      <div className="container">
        <div className="product-detail-layout">
          {/* Cột Ảnh Sản Phẩm */}
          <div className="product-image-column">
            <img src={plant.mainImage} alt={plant.name} />
            <section id="mini-gallery" className="image-gallery-section">
              <div className="container">
                <div className="gallery-grid mini-gallery-grid">
                  {/* Lặp qua thư viện ảnh mini */}
                  {plant.gallery.map((image, index) => (
                    <div className="gallery-item" key={index}>
                      <img src={image} alt={`${plant.name} - ảnh ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Cột Thông Tin Sản Phẩm */}
          <div className="product-info-column">
            <h1>{plant.name}</h1>
            <div className="product-description">
              <p>{plant.description}</p>
              <h3>Đặc điểm nổi bật:</h3>
              <ul>
                {plant.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <h3>Hướng dẫn chăm sóc:</h3>
              <ul>
                <li><strong>Ánh sáng:</strong> {plant.care.light}</li>
                <li><strong>Nước:</strong> {plant.care.water}</li>
                <li><strong>Đất:</strong> {plant.care.soil}</li>
                <li><strong>Nhiệt độ:</strong> {plant.care.temp}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailPage;