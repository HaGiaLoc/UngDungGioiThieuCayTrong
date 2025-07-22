// src/pages/TrangChu/DetailPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Import hình ảnh (giả sử bạn đã đặt chúng trong assets)
import kimTienImg from '../../assets/images/Kt.jpg';
import luoiHoImg from '../../assets/images/Lh.jpg';
import trauBaImg from '../../assets/images/Tb.jpg';

// Dữ liệu giả lập cho tất cả các cây, bao gồm chi tiết
// Khi có backend, bạn sẽ gọi API вида `getPlantById(plantId)` để lấy dữ liệu này
const allPlantsData = [
  {
    id: '1', // ID phải là chuỗi để khớp với useParams
    name: 'Cây Kim Tiền',
    mainImage: kimTienImg,
    gallery: [kimTienImg],
    description: 'Cây Kim Tiền là loại cây cảnh phong thủy được ưa chuộng với những tán lá xanh bóng, mọc đối xứng và dày dặn, biểu tượng cho sự giàu sang và thịnh vượng.',
    features: [
      'Lá xanh bóng, mọc đều hai bên thân cây',
      'Thân cây mọng nước, có khả năng trữ nước tốt',
      'Sống tốt trong môi trường ánh sáng yếu hoặc phòng điều hòa',
      'Là loại cây phong thủy hút tài lộc, may mắn',
      'Dễ trồng và chăm sóc, phù hợp cho văn phòng và nhà ở',
    ],
    care: {
      light: 'Ưa sáng nhẹ, tránh ánh nắng gắt trực tiếp, có thể đặt trong nhà hoặc phòng làm việc',
      water: 'Tưới 1-2 lần mỗi tuần, tránh để đất quá ẩm dễ gây úng',
      soil: 'Đất tơi xốp, thoát nước tốt, có thể trộn với xơ dừa hoặc sỏi nhẹ',
      temp: 'Thích hợp với nhiệt độ từ 18-30°C, tránh để cây nơi quá lạnh hoặc gió mạnh',
    }
  },
  // Thêm dữ liệu cho các cây khác để kiểm tra tính năng động
  {
    id: '2',
    name: 'Cây Lưỡi Hổ',
    mainImage: luoiHoImg,
    gallery: [luoiHoImg],
    description: 'Cây Lưỡi Hổ nổi tiếng với khả năng thanh lọc không khí vượt trội, hấp thụ các chất độc hại và cung cấp oxy vào ban đêm.',
    features: ['Thanh lọc không khí hiệu quả', 'Chịu hạn tốt, ít cần tưới nước', 'Kiểu dáng hiện đại, tối giản'],
    care: { light: 'Sống tốt trong nhiều điều kiện ánh sáng, từ yếu đến mạnh', water: 'Chỉ tưới khi đất khô hoàn toàn', soil: 'Đất thoát nước tốt', temp: 'Chịu được biên độ nhiệt độ rộng' }
  },
  {
    id: '3',
    name: 'Cây Trầu Bà',
    mainImage: trauBaImg,
    gallery: [trauBaImg],
    description: 'Là loại cây dây leo phổ biến, dễ trồng trong cả đất và nước, có khả năng hút các bức xạ từ thiết bị điện tử.',
    features: ['Dạng dây leo đẹp mắt', 'Có thể trồng trong đất hoặc thủy sinh', 'Hút bức xạ điện tử'],
    care: { light: 'Ưa bóng râm, tránh nắng trực tiếp', water: 'Giữ đất ẩm nhưng không sũng nước', soil: 'Đất tơi xốp', temp: 'Nhiệt độ phòng bình thường' }
  }
];

function DetailPage() {
  // Dùng hook useParams để lấy giá trị của 'plantId' từ URL
  const { plantId } = useParams();

  // Tìm cây trong mảng dữ liệu có id tương ứng
  const plant = allPlantsData.find(p => p.id === plantId);

  // Xử lý trường hợp không tìm thấy cây (URL không hợp lệ)
  if (!plant) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <h1>404 - Không tìm thấy sản phẩm</h1>
        <p>Rất tiếc, cây bạn đang tìm kiếm không tồn tại.</p>
        <Link to="/" className="btn btn-primary">Quay về Trang Chủ</Link>
      </div>
    );
  }

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