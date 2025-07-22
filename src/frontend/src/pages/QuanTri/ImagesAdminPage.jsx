// src/pages/QuanTri/ImagesAdminPage.jsx
import React from 'react';

function ImagesAdminPage() {
    // Dữ liệu này sau sẽ được lấy từ API
    const imageCategories = [
        { id: 1, name: 'Ảnh Cây Trong Nhà', count: 25 },
        { id: 2, name: 'Ảnh Cây Phong Thủy', count: 18 },
        { id: 3, name: 'Ảnh Trang Trí Chung', count: 40 },
    ];
    const images = [
        { id: 1, name: 'cay_luoi_ho.jpeg', src: 'https://via.placeholder.com/200x200/90EE90/000?text=Ảnh%201' },
        { id: 2, name: 'anh_2.jpg', src: 'https://via.placeholder.com/200x200/98FB98/000?text=Ảnh%202' },
    ];

  return (
    <div id="images" className="content-page active">
        <header className="content-header">
            <h1>Quản Lý Thư Viện Ảnh</h1>
            <button className="btn btn-primary"><i className="fas fa-upload"></i> Tải Ảnh Lên</button>
        </header>

        <section className="content-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Danh Mục Ảnh</h2>
                <button className="btn btn-secondary"><i className="fas fa-plus"></i> Thêm Danh Mục Ảnh</button>
            </div>
            <div className="table-responsive">
                <table className="admin-table">
                    <thead><tr><th>ID</th><th>Tên Danh Mục Ảnh</th><th>Số Lượng Ảnh</th><th>Hành Động</th></tr></thead>
                    <tbody>
                        {imageCategories.map(cat => (
                            <tr key={cat.id}>
                                <td data-label="id">{cat.id}</td>
                                <td data-label="ten">{cat.name}</td>
                                <td data-label="soluong">{cat.count}</td>
                                <td>
                                    <button className="btn btn-sm btn-edit-image-category">Sửa</button>
                                    <button className="btn btn-sm btn-delete-image-category">Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

        <section className="content-section">
            <h2>Thư Viện Ảnh</h2>
            <div className="list-filters">
                <input type="text" placeholder="Tìm tên file ảnh..." />
                <select><option value="">Tất cả danh mục ảnh</option><option>Ảnh Cây Trong Nhà</option></select>
                <button className="btn btn-secondary">Lọc Ảnh</button>
            </div>
            <div className="image-gallery-grid">
                {images.map(img => (
                    <div className="gallery-item" key={img.id}>
                        <img src={img.src} alt={img.name} />
                        <div className="gallery-actions">
                            <span>{img.name}</span>
                            <button className="btn btn-xs btn-delete-image">Xóa</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination"><a href="#">« Trước</a><a href="#" className="active">1</a><a href="#">2</a><a href="#">Sau »</a></div>
        </section>
    </div>
  );
}

export default ImagesAdminPage;