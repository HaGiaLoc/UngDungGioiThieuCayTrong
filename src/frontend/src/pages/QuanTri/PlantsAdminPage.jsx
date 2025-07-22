// src/pages/QuanTri/PlantsAdminPage.jsx
import React from 'react';

function PlantsAdminPage() {
  // Dữ liệu này sau sẽ được lấy từ API
  const plantsData = [
    { id: 1, name: 'Cây Kim Tiền', category: 'Cây Phong Thủy', status: 'Hiển thị' },
    { id: 2, name: 'Cây Trầu Bà', category: 'Cây Dây Leo', status: 'Đã ẩn' },
  ];

  return (
    <div id="plants" className="content-page active">
      <header className="content-header">
        <h1>Quản Lý Giới Thiệu Cây</h1>
        <button className="btn btn-primary"><i className="fas fa-plus"></i> Thêm Cây Mới</button>
      </header>
      <section className="content-section">
        <h2>Danh Sách Cây</h2>
        <div className="list-filters">
          <input type="text" placeholder="Tìm tên cây..." />
          <select><option value="">Tất cả danh mục</option></select>
          <select><option value="">Tất cả trạng thái</option></select>
          <button className="btn btn-secondary">Lọc</button>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>Ảnh</th><th>Tên Cây</th><th>Danh Mục</th><th>Trạng Thái</th><th>Hành Động</th></tr>
            </thead>
            <tbody>
              {plantsData.map(plant => (
                <tr key={plant.id}>
                  <td data-label="id">{plant.id}</td>
                  <td data-label="anh"><img src="https://via.placeholder.com/50x50/90EE90/000?text=Cây" alt="Ảnh" className="table-img" /></td>
                  <td data-label="ten">{plant.name}</td>
                  <td data-label="danhmuc">{plant.category}</td>
                  <td data-label="trangthai">
                    <span className={`status ${plant.status === 'Hiển thị' ? 'status-visible' : 'status-hidden'}`}>{plant.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-edit-plant">Sửa</button>
                    {plant.status === 'Hiển thị' ? (
                      <button className="btn btn-sm btn-hide">Ẩn</button>
                    ) : (
                      <button className="btn btn-sm btn-show">Hiện</button>
                    )}
                    <button className="btn btn-sm btn-delete-plant">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination"><a href="#">« Trước</a><a href="#" className="active">1</a><a href="#">2</a><a href="#">Sau »</a></div>
      </section>
    </div>
  );
}

export default PlantsAdminPage;