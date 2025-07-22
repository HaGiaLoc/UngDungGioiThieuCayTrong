// Middleware xử lý lỗi cho Express
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Đã xảy ra lỗi máy chủ!' });
}

module.exports = errorHandler;
