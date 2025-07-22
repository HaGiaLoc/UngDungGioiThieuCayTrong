// src/components/PlantCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Bạn có thể tạo file CSS riêng cho card nếu muốn
// import './PlantCard.css'; 

function PlantCard({ id, image, name, description }) {
  return (
    <div className="plant-card" style={{width: '300px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', paddingBottom: '1.5rem', margin: '0 auto', background: '#fff', marginBottom: '2rem'}}>
      <img src={image ? image : ''} alt={name} style={{width: '100%', height: '250px', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}} />
      <h3 style={{color: '#4caf50', margin: '1rem 0 0.5rem', fontWeight: 'bold', fontSize: '1.3rem'}}>{name}</h3>
      <p style={{padding: '0 1rem', fontSize: '0.95rem', color: '#444', minHeight: '60px'}}>{description}</p>
      <Link
        to={`/chi-tiet/${id}`}
        className="btn btn-secondary vibrant-green-btn"
        style={{
          marginTop: '1rem',
          background: '#43d167',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px 24px',
          fontSize: '1rem',
          border: 'none',
          transition: 'background 0.2s',
          display: 'inline-block',
          cursor: 'pointer',
        }}
        onMouseOver={e => (e.currentTarget.style.background = '#b6f5c7')}
        onMouseOut={e => (e.currentTarget.style.background = '#43d167')}
      >
        Xem Chi Tiết
      </Link>
    </div>
  );
}

export default PlantCard;