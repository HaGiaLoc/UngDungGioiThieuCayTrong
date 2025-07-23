// interface/components/StatCard.jsx
import React from 'react';

// ✅ 1. IMPORT COMPONENT FontAwesomeIcon và các icon cần thiết
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faTags, faCheckCircle, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Tạo một object để dễ dàng tra cứu icon từ chuỗi
const iconMap = {
  'fas fa-leaf': faLeaf,
  'fas fa-tags': faTags,
  'fas fa-check-circle': faCheckCircle,
  'fas fa-eye-slash': faEyeSlash
};

// Component StatCard giờ sẽ nhận vào chuỗi tên icon như cũ
function StatCard({ icon, title, value, color, bgColor }) {
  // Tra cứu để lấy về object icon thật sự từ tên chuỗi
  const selectedIcon = iconMap[icon];

  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ backgroundColor: bgColor, color: color }}>
        {/* ✅ 2. THAY THẾ <i> BẰNG <FontAwesomeIcon> */}
        {/* Chỉ render icon nếu nó tồn tại trong map */}
        {selectedIcon && <FontAwesomeIcon icon={selectedIcon} />}
      </div>
      <div className="stat-card-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default StatCard;