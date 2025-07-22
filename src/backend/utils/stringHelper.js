// stringHelper.js - Hàm tiện ích xử lý chuỗi

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  capitalize,
}; 