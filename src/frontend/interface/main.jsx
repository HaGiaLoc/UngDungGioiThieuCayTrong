// interface/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Đảm bảo import đúng file App

// Import file CSS toàn cục
import './assets/styles/global.css'; 

// Dòng này tìm thẻ div có id='root' trong public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Và render component App vào trong đó
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);