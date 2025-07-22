# Backend cho Green Garden

Thư mục này chứa mã nguồn backend phục vụ cho ứng dụng Green Garden.

## Cấu trúc hiện tại:

- `controllers/` — Xử lý logic cho các route (API), ví dụ: plant.controller.js
- `models/` — Định nghĩa cấu trúc dữ liệu, ví dụ: plant.model.js
- `routes/` — Định nghĩa các endpoint API, ví dụ: plant.routes.js
- `services/` — Xử lý nghiệp vụ, ví dụ: plant.service.js
- `middlewares/` — Các middleware (xác thực, kiểm tra lỗi, ...), ví dụ: errorHandler.js
- `utils/` — Các hàm tiện ích, ví dụ: stringHelper.js
- `config/` — Cấu hình (database, môi trường, ...), ví dụ: db.js
- `package.json` — Quản lý dependencies backend
- `.env` — Biến môi trường (nếu cần)

## Định hướng modular

Bạn nên gom các file liên quan đến từng domain vào một module riêng (ví dụ: modules/plant/), giúp mã nguồn dễ bảo trì và mở rộng.

## Công nghệ sử dụng
- Node.js + Express
- Kết nối database (MongoDB, MySQL, ...)

## Khởi động server
- Server backend hiện tại được khởi tạo ở solution/app.js
- Có thể tạo file api/server.js để khởi động server từ thư mục api nếu muốn.

Bạn có thể yêu cầu mình tạo code mẫu cho từng phần khi cần! 