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
cd src
docker-compose up --build
```

## 💾 Sao Lưu & Khôi Phục Cơ Sở Dữ Liệu

### 1. Sao lưu

**Với Docker:**
```sh
docker exec mysql_db mysqldump -u root -pYOUR_PASSWORD TEN_DATABASE > backup.sql
```
- Thay `YOUR_PASSWORD` bằng mật khẩu root MySQL.
- Thay `TEN_DATABASE` bằng tên database cần sao lưu.

**Nếu chạy MySQL trực tiếp:**
```sh
mysqldump -u root -p TEN_DATABASE > backup.sql
```

### 2. Khôi phục

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

## ⚙️ Cấu Trúc Dự Án Chi Tiết
```
UngDungGioiThieuCayTrong/
├── src/                      # Mã nguồn chính của dự án
│   ├── backend/              # Backend - Node.js, Express, Sequelize
│   │   ├── config/               # Cấu hình (CSDL, biến môi trường, ...)
│   │   ├── controllers/          # Xử lý logic cho các route (auth, plant, category, image)
│   │   ├── middlewares/          # Middleware dùng chung (xử lý lỗi, xác thực, ...)
│   │   ├── models/               # Định nghĩa các model Sequelize (Plant, Category, Image)
│   │   ├── node_modules/         # Thư viện cài đặt bởi npm
│   │   ├── routes/               # Định nghĩa các endpoint API
│   │   ├── services/             # Xử lý nghiệp vụ, truy vấn dữ liệu
│   │   ├── utils/                # Hàm tiện ích dùng chung
│   │   ├── .env                  # Biến môi trường backend
│   │   ├── app.js                # Khởi tạo app, cấu hình middleware, swagger, routes
│   │   ├── Dockerfile            # Docker hóa backend
│   │   ├── package.json          # Thông tin, dependencies backend
│   │   └── server.js             # Điểm khởi động server, kết nối CSDL
│   │
│   ├── frontend/             # Frontend - ReactJS
│   │   ├── src/                  # Mã nguồn React
│   │   │   ├── assets/           # Tài nguyên giao diện
│   │   │   │   ├── images/       # Ảnh sử dụng trong giao diện
│   │   │   │   └── styles/       # File CSS (global, quản trị, ...)
│   │   │   ├── components/       # Các component dùng chung (Header, Footer, PlantCard, ...)
│   │   │   ├── pages/            # Các trang chính
│   │   │   │   ├── TrangChu/     # Trang người dùng (Home, Search, Detail, Category)
│   │   │   │   └── QuanTri/      # Trang quản trị (Dashboard, Login, Admin, ...)
│   │   │   ├── App.jsx           # Gốc ứng dụng React
│   │   │   ├── main.jsx          # Điểm khởi tạo React
│   │   │   ├── App.css           # Style tổng cho app
│   │   │   └── index.css         # Style gốc
│   │   ├── public/               # Ảnh tĩnh, favicon, index.html
│   │   ├── package.json          # Thông tin, dependencies frontend
│   │   ├── Dockerfile            # Docker hóa frontend
│   │   ├── vite.config.js        # Cấu hình Vite
│   │   ├── eslint.config.js      # Cấu hình ESLint
│   │   └── .env                  # Biến môi trường frontend
│   ├── docker-compose.yml            # Chạy cả frontend & backend bằng Docker
│   └── .gitignore                    # Các file/thư mục không đưa lên git
│
├── thesis/                       # Thư mục luận văn/báo cáo
└── README.md                     # Tài liệu tổng thể dự án
```

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

---

