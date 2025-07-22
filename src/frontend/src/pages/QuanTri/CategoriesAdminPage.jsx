// src/pages/QuanTri/CategoriesAdminPage.jsx
import React from 'react';

function CategoriesAdminPage() {
    // Dữ liệu này sau sẽ được lấy từ API
  const categoriesData = [
      { id: 1, name: 'Cây Trong Nhà', count: 15, status: 'Hiển thị' },
      { id: 2, name: 'Cây Phong Thủy', count: 12, status: 'Hiển thị' },
      { id: 3, name: 'Cây Ăn Quả', count: 8, status: 'Đã ẩn' },
      { id: 4, name: 'Cây Dây Leo', count: 5, status: 'Hiển thị' },
  ];

  return (
    <div id="categories" className="content-page active">
        <header className="content-header">
            <h1>Quản Lý Danh Mục Giới Thiệu</h1>
            <button className="btn btn-primary"><i className="fas fa-plus"></i> Thêm Danh Mục Mới</button>
        </header>
        <section className="content-section">
            <h2>Danh Sách Danh Mục</h2>
            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr><th>ID</th><th>Tên Danh Mục</th><th>Số Lượng Cây</th><th>Trạng Thái</th><th>Hành Động</th></tr>
                    </thead>
                    <tbody>
                        {categoriesData.map(category => (
                            <tr key={category.id}>
                                <td data-label="id">{category.id}</td>
                                <td data-label="ten">{category.name}</td>
                                <td data-label="soluong">{category.count}</td>
                                <td data-label="trangthai">
                                  <span className={`status ${category.status === 'Hiển thị' ? 'status-visible' : 'status-hidden'}`}>{category.status}</span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-edit-category">Sửa</button>
                                    {category.status === 'Hiển thị' ? (
                                      <button className="btn btn-sm btn-hide">Ẩn</button>
                                    ) : (
                                      <button className="btn btn-sm btn-show">Hiện</button>
                                    )}
                                    <button className="btn btn-sm btn-delete-category">Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination"><a href="#">« Trước</a><a href="#" className="active">1</a><a href="#">Sau »</a></div>
        </section>
    </div>
  );
}

export default CategoriesAdminPage;