# 🌱 Giới Thiệu Cây Trồng - Hệ Thống Quản Lý Cây Trồng

Ứng dụng web quản lý, tra cứu thông tin các loại cây trồng, hình ảnh, danh mục và hỗ trợ quản trị viên thao tác dữ liệu dễ dàng. Giao diện hiện đại, dễ sử dụng, tích hợp cả **Frontend (ReactJS)** và **Backend (Node.js + Express + Sequelize + MySQL)**.

---

## 📖 Mô tả dự án

**Giới Thiệu Cây Trồng** giúp quản lý, tìm kiếm, thống kê các loại cây trồng, hình ảnh, danh mục và trạng thái cây. Hệ thống hỗ trợ quản trị viên thao tác dữ liệu nhanh chóng, bảo mật với tài khoản đăng nhập riêng.

---

## ✨ Tính năng chính

- 🌳 **Xem danh sách, chi tiết cây trồng**
- 🔍 **Tìm kiếm, lọc cây theo danh mục, đặc điểm**
- 🏷️ **Quản lý danh mục, hình ảnh, cây trồng (admin)**
- 📊 **Thống kê số lượng cây, danh mục, trạng thái**
- 🔑 **Đăng nhập quản trị viên**
- 💻 **Giao diện hiện đại, responsive**
- 🐳 **Hỗ trợ chạy Docker, backup/restore MySQL**

---

## 🚀 Hướng dẫn cài đặt

### ⚙️ Yêu cầu hệ thống
- Node.js >= 18.0.0
- MySQL >= 8.0
- npm hoặc yarn

### 🔧 Cài đặt Backend
```bash
# 1. Clone repository
 git clone https://github.com/HaGiaLoc/UngDungGioiThieuCayTrong.git
 cd UngDungGioiThieuCayTrong

# 2. Cài đặt thư viện
 cd src/backend
 npm install

# 3. Cấu hình CSDL
# Sửa file src/backend/config/database.js cho đúng thông tin MySQL

# 4. Khởi động backend
 npm start
# Mặc định chạy ở http://localhost:3000
```

### 💻 Cài đặt Frontend
```bash
# 1. Cài đặt thư viện
cd ../frontend
npm install

# 2. Khởi động frontend
npm run dev
# Mặc định chạy ở http://localhost:5173
```

### 🐳 Chạy với Docker
```bash
cd src
docker compose up --build
```

---

## 💾 Sao lưu & Khôi phục CSDL

### 1. Sao lưu (Export)
**Với Docker:**
```sh
docker exec mysql_db mysqldump -u root -pYOUR_PASSWORD TEN_DATABASE > backup.sql
```
**Nếu chạy MySQL trực tiếp:**
```sh
mysqldump -u root -p TEN_DATABASE > backup.sql
```

### 2. Khôi phục (Import)
**Với Docker:**
```sh
docker exec -i mysql_db mysql -u root -pYOUR_PASSWORD TEN_DATABASE < backup.sql
```
**Nếu chạy MySQL trực tiếp:**
```sh
mysql -u root -p TEN_DATABASE < backup.sql
```
> Lưu ý: File `backup.sql` cần nằm ở thư mục bạn chạy lệnh hoặc chỉ rõ đường dẫn đầy đủ.

---

## 🛠️ Phụ thuộc chính

### Backend
```json
{
  "express": "^5.1.0",
  "sequelize": "^6.37.1",
  "mysql2": "^3.9.7",
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.1"
}
```
### Frontend
```json
{
  "react": "^19.1.0",
  "react-router-dom": "^7.7.0",
  "chart.js": "^4.5.0",
  "react-chartjs-2": "^5.3.0"
}
```

---

## 📄 Tài khoản mặc định (Demo)
- **Username:** `admin`
- **Password:** `admin123`
> (Có thể thay đổi trong code backend)

---

## 📚 Tài liệu tham khảo
- [ReactJS](https://react.dev/)
- [Express.js Guide](https://expressjs.com)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Sequelize ORM](https://sequelize.org/)

> © 2025 Giới Thiệu Cây Trồng. All rights reserved.