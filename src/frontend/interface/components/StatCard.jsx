import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faTags, faCheckCircle, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  'fas fa-leaf': faLeaf,
  'fas fa-tags': faTags,
  'fas fa-check-circle': faCheckCircle,
  'fas fa-eye-slash': faEyeSlash
};

function StatCard({ icon, title, value, color, bgColor }) {
  const selectedIcon = iconMap[icon];

  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ backgroundColor: bgColor, color: color }}>
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