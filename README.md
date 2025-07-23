# 🌱 GTCayTrong - Hệ Thống Quản Lý Cây Trồng

GTCayTrong là hệ thống web giúp quản lý, tra cứu thông tin các loại cây trồng, hình ảnh, danh mục và hỗ trợ quản trị viên thao tác dữ liệu dễ dàng. Dự án gồm 2 phần: **Frontend** (ReactJS) và **Backend** (Node.js + Express + Sequelize).

---

## 🚀 Tính Năng Chính
- Xem danh sách, chi tiết các loại cây trồng
- Tìm kiếm, lọc cây theo danh mục, đặc điểm
- Quản lý danh mục, hình ảnh, cây trồng (dành cho admin)
- Thống kê số lượng cây, danh mục, trạng thái
- Đăng nhập quản trị viên
- Giao diện hiện đại, dễ sử dụng

---

## 🛠️ Hướng Dẫn Cài Đặt

### 1. Clone dự án
```bash
git clone https://github.com/tenban/du-an-gtcaytrong.git
cd GTCayTrong
```

### 2. Cài đặt Backend
```bash
cd backend
npm install
```
- Sửa file `backend/config/database.js` cho phù hợp với thông tin MySQL của bạn.
- Chạy backend:
```bash
npm start
```
- Backend mặc định chạy ở: [http://localhost:3001](http://localhost:3001)
- Tài liệu API: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

### 3. Cài đặt Frontend
```bash
cd ../frontend
npm install
```
- Chạy frontend:
```bash
npm run dev
```
- Frontend mặc định chạy ở: [http://localhost:5173](http://localhost:5173)

### 4. Chạy bằng Docker (tùy chọn)
```bash
docker-compose up --build
```

---

## ⚙️ Cấu Trúc Dự Án Chi Tiết
```
GTCayTrong/
├── backend/                  # Backend - Node.js, Express, Sequelize
│   ├── app.js                # Khởi tạo app, cấu hình middleware, swagger, routes
│   ├── server.js             # Điểm khởi động server, kết nối CSDL
│   ├── package.json          # Thông tin, dependencies backend
│   ├── Dockerfile            # Docker hóa backend
│   ├── config/               # Cấu hình (CSDL, biến môi trường, ...)
│   │   └── database.js       # Kết nối và cấu hình Sequelize
│   ├── controllers/          # Xử lý logic cho các route (auth, plant, category, image)
│   ├── models/               # Định nghĩa các model Sequelize (Plant, Category, Image)
│   ├── routes/               # Định nghĩa các endpoint API
│   ├── services/             # Xử lý nghiệp vụ, truy vấn dữ liệu
│   ├── middlewares/          # Middleware dùng chung (xử lý lỗi, xác thực, ...)
│   ├── utils/                # Hàm tiện ích dùng chung
│
├── frontend/                 # Frontend - ReactJS
│   ├── src/                  # Mã nguồn React
│   │   ├── assets/           # Ảnh, icon, style CSS
│   │   │   ├── images/       # Ảnh sử dụng trong giao diện
│   │   │   └── styles/       # File CSS (global, quản trị, ...)
│   │   ├── components/       # Các component dùng chung (Header, Footer, PlantCard, ...)
│   │   ├── pages/            # Các trang chính (Trang chủ, Quản trị, Chi tiết, ...)
│   │   │   ├── TrangChu/     # Trang người dùng (Home, Search, Detail, Category)
│   │   │   └── QuanTri/      # Trang quản trị (Dashboard, Login, Admin, ...)
│   │   ├── App.jsx           # Gốc ứng dụng React
│   │   └── main.jsx          # Điểm khởi tạo React
│   ├── public/               # Ảnh tĩnh, favicon, index.html
│   ├── package.json          # Thông tin, dependencies frontend
│   ├── Dockerfile            # Docker hóa frontend
│
├── .gitignore                # Các file/thư mục không đưa lên git
└── docker-compose.yml        # Chạy cả frontend & backend bằng Docker
```

### Giải thích nhanh:
- **backend/**: Toàn bộ mã nguồn và cấu hình cho API, database, nghiệp vụ.
- **frontend/**: Toàn bộ mã nguồn React, giao diện người dùng.
- **docker-compose.yml**: Dùng để chạy đồng thời cả frontend và backend bằng Docker.
- **.gitignore**: Loại trừ các file không cần thiết khi đẩy lên GitHub.
- **README.md**: Tài liệu hướng dẫn tổng thể dự án.

---

## 📄 Tài Khoản Mặc Định (Demo)
- Tài khoản admin:  
  - Username: `admin`  
  - Password: `admin123`  
  (Có thể thay đổi trong code backend)

---

## 💡 Đóng Góp & Liên Hệ
- Nếu bạn muốn đóng góp, hãy tạo pull request hoặc issue trên Github.
- Mọi thắc mắc, vui lòng liên hệ qua email hoặc Facebook của nhóm phát triển.

---

Chúc bạn sử dụng hệ thống hiệu quả! 🌿