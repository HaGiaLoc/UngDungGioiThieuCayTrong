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

  // Thêm log để debug dữ liệu nhận được từ backend
  console.log('Chi tiết plant:', plant);

  // Nếu tìm thấy cây, render ra giao diện chi tiết
  return (
    <main className="product-detail-main">
      <div className="container">
        <div className="product-detail-layout">
          {/* Cột Ảnh Sản Phẩm */}
          <div className="product-image-column">
            <img src={plant.image ? plant.image : ''} alt={plant.name} />
          </div>

          {/* Cột Thông Tin Sản Phẩm */}
          <div className="product-info-column">
            <h1>{plant.name}</h1>
            <div className="product-description">
              <p>{plant.description}</p>
              {/* Đặc điểm nổi bật */}
              {plant.features && Array.isArray(plant.features) && plant.features.length > 0 && (
                <>
                  <h3>Đặc điểm nổi bật:</h3>
                  <ul>
                    {plant.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
              {/* Hướng dẫn chăm sóc */}
              {plant.care && (
                <>
                  <h3>Hướng dẫn chăm sóc:</h3>
                  <ul>
                    {plant.care.light && <li><strong>Ánh sáng:</strong> {plant.care.light}</li>}
                    {plant.care.water && <li><strong>Nước:</strong> {plant.care.water}</li>}
                    {plant.care.soil && <li><strong>Đất:</strong> {plant.care.soil}</li>}
                    {plant.care.temp && <li><strong>Nhiệt độ:</strong> {plant.care.temp}</li>}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailPage;