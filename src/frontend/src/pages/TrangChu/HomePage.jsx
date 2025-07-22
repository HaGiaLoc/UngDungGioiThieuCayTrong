import React from 'react';
import { Link } from 'react-router-dom';

// Import hình ảnh
import kimTienImg from '../../assets/images/Kt.jpg';
import luoiHoImg from '../../assets/images/Lh.jpg';
import trauBaImg from '../../assets/images/Tb.jpg';
// about-image-container đang trống, bạn có thể thêm ảnh nền qua CSS hoặc dùng thẻ img

function HomePage() {
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
          <div className="plant-grid">
            <div className="plant-card">
              <img src={kimTienImg} alt="Cây Kim Tiền" />
              <h3>Cây Kim Tiền</h3>
              <p>Mang lại may mắn, tài lộc, dễ chăm sóc, phù hợp với văn phòng và nhà ở.</p>
              {/* Giả sử bạn sẽ có trang chi tiết với id là 1 */}
              <Link to="/chi-tiet/1" className="btn btn-secondary">Chi Tiết</Link>
            </div>

            <div className="plant-card">
              <img src={luoiHoImg} alt="Cây Lưỡi Hổ" />
              <h3>Cây Lưỡi Hổ</h3>
              <p>Thanh lọc không khí hiệu quả, chịu hạn tốt, kiểu dáng hiện đại.</p>
              <Link to="/chi-tiet/2" className="btn btn-secondary">Xem Chi Tiết</Link>
            </div>

            <div className="plant-card">
              <img src={trauBaImg} alt="Cây Trầu Bà" />
              <h3>Cây Trầu Bà</h3>
              <p>Dạng dây leo đẹp mắt, dễ trồng trong nước hoặc đất, hút bức xạ điện tử.</p>
              <Link to="/chi-tiet/3" className="btn btn-secondary">Xem Chi Tiết</Link>
            </div>

            <div className="plant-card">
              {/* Hình ảnh từ placeholder không cần import */}
              <img src="https://via.placeholder.com/300x250/2E8B57/FFFFFF?text=Cây+Bàng+Singapore" alt="Cây Bàng Singapore" />
              <h3>Cây Bàng Singapore</h3>
              <p>Kiểu dáng sang trọng, lá to bản, biểu tượng cho sự phát triển.</p>
              <Link to="/chi-tiet/4" className="btn btn-secondary">Xem Chi Tiết</Link>
            </div>

            <div className="plant-card">
              <img src="https://via.placeholder.com/300x250/90EE90/000000?text=Cây+Kim+Tiền" alt="Cây" />
              <h3>Cây 4</h3>
              <p></p>
              <Link to="/chi-tiet/5" className="btn btn-secondary">Xem Chi Tiết</Link>
            </div>

            <div className="plant-card">
              <img src="https://via.placeholder.com/300x250/90EE90/000000?text=Cây+Kim+Tiền" alt="Cây" />
              <h3>Cây 5</h3>
              <p></p>
              <Link to="/chi-tiet/6" className="btn btn-secondary">Xem Chi Tiết</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;