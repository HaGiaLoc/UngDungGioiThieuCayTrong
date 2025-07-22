# backend/Dockerfile

FROM node:20

# Tạo thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json nếu có
COPY package*.json ./

# Cài đặt các thư viện
RUN npm install

# Copy toàn bộ mã nguồn vào image
COPY . .

# Mở cổng cho API
EXPOSE 3000

# Chạy server
CMD ["npm", "start"]
