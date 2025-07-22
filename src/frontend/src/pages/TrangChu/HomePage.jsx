import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Import hình ảnh
import kimTienImg from '../../assets/images/Kt.jpg';
import luoiHoImg from '../../assets/images/Lh.jpg';
import trauBaImg from '../../assets/images/Tb.jpg';
// about-image-container đang trống, bạn có thể thêm ảnh nền qua CSS hoặc dùng thẻ img

const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/api/plants?featured=true`)
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
        return res.json();
      })
      .then(data => setPlants(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Mang Thiên Nhiên Vào Ngôi Nhà Của Bạn</h1>
            <p>Khám phá bộ sưu tập cây trồng đa dạng, giúp không gian sống thêm xanh và trong lành.</p>
            <a href="#featured-plants" className="btn btn-primary">Xem Ngay</a>
          </div>
        </div>
      </section>

      <section id="about" className="about-us">
        <div className="container">
          <div className="about-text-content">
            <h2>Green Garden - Khu Vườn Của Bạn</h2>
            <p>Chúng tôi đam mê mang màu xanh của thiên nhiên đến gần hơn với cuộc sống đô thị. Tại Green Garden, bạn sẽ tìm thấy những loại cây khỏe mạnh, đa dạng từ cây để bàn xinh xắn đến những cây phong thủy ý nghĩa.</p>
            <p>Với kinh nghiệm và sự tận tâm, chúng tôi không chỉ cung cấp cây trồng chất lượng mà còn đồng hành cùng bạn trong quá trình chăm sóc, giúp khu vườn nhỏ của bạn luôn tươi tốt.</p>
          </div>
          <div className="about-image-container">
            {/* Bạn có thể thêm 1 ảnh ở đây, ví dụ: <img src={...} alt="Khu vườn Green Garden" /> */}
          </div>
        </div>
      </section>

      <section id="featured-plants" className="featured-plants">
        <div className="container">
          <h2>Cây Trồng Nổi Bật</h2>
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="no-results">Lỗi: {error}</p>
          ) : plants.filter(plant => plant.status === 'Hiển thị').length > 0 ? (
            <div className="plant-grid">
              {plants.filter(plant => plant.status === 'Hiển thị').map(plant => (
                <div className="plant-card" key={plant.id}>
                  <img src={plant.image ? plant.image : ''} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <Link to={`/chi-tiet/${plant.id}`} className="btn btn-secondary">Xem Chi Tiết</Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">Không có cây nổi bật nào.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default HomePage;