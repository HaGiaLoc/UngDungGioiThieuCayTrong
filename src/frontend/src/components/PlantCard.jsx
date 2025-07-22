// src/components/PlantCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Bạn có thể tạo file CSS riêng cho card nếu muốn
// import './PlantCard.css'; 

function PlantCard({ id, image, name, description }) {
  return (
    <div className="plant-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      {/* Link đến trang chi tiết với id của cây */}
      <Link to={`/chi-tiet/${id}`} className="btn btn-secondary">Xem Chi Tiết</Link>
    </div>
  );
}

export default PlantCard;