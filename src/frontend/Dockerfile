# frontend/Dockerfile

FROM node:20

# Tạo thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json nếu có
COPY package*.json ./

# Cài đặt tất cả các thư viện (bao gồm vite)
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Mở port mặc định của vite
EXPOSE 5173

# Chạy ứng dụng
CMD ["npm", "run", "dev"]
