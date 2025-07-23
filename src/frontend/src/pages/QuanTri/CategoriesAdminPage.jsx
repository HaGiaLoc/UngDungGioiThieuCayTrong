import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function CategoriesAdminPage() {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  // Lọc
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/api/categories`)
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
        return res.json();
      })
      .then(data => setCategoriesData(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Thêm danh mục
  const handleAdd = () => {
    setEditCategory({ name: '', status: 'Hiển thị' });
    setIsAddMode(true);
    setModalOpen(true);
  };
  // Sửa danh mục
  const handleEdit = (cat) => {
    setEditCategory({ ...cat });
    setIsAddMode(false);
    setModalOpen(true);
  };
  // Đóng modal
  const closeModal = () => {
    setModalOpen(false);
    setEditCategory(null);
    setIsAddMode(false);
  };
  // Xử lý thay đổi input
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCategory(prev => ({ ...prev, [name]: value }));
  };
  // Lưu cập nhật/thêm mới
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (isAddMode) {
      fetch(`${API_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCategory)
      })
        .then(res => {
          if (!res.ok) throw new Error('Lỗi khi thêm danh mục');
          return res.json();
        })
        .then(data => {
          setCategoriesData([data, ...categoriesData]);
          closeModal();
        })
        .catch(err => alert(err.message));
    } else {
      fetch(`${API_URL}/api/categories/${editCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCategory)
      })
        .then(res => {
          if (!res.ok) throw new Error('Lỗi khi cập nhật');
          return res.json();
        })
        .then(data => {
          setCategoriesData(categoriesData.map(c => c.id === data.id ? data : c));
          closeModal();
        })
        .catch(err => alert(err.message));
    }
  };
  // Xóa danh mục
  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;
    fetch(`${API_URL}/api/categories/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi xóa');
        setCategoriesData(categoriesData.filter(c => c.id !== id));
      })
      .catch(err => alert(err.message));
  };
  // Lọc client
  const filteredCategories = categoriesData.filter(cat => {
    const matchName = cat.name.toLowerCase().includes(filterName.toLowerCase());
    const matchStatus = filterStatus ? (cat.status === filterStatus) : true;
    return matchName && matchStatus;
  });

  return (
    <div id="categories" className="content-page active">
        <header className="content-header" style={{padding: '20px'}}>
            <h1>Quản Lý Danh Mục Giới Thiệu</h1>
            <button className="btn btn-primary" onClick={handleAdd}><i className="fas fa-plus"></i> Thêm Danh Mục Mới</button>
        </header>
        <section className="content-section">
            <h2>Danh Sách Danh Mục</h2>
            <div className="list-filters">
              <input type="text" placeholder="Tìm tên danh mục..." value={filterName} onChange={e => setFilterName(e.target.value)} />
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="">Tất cả trạng thái</option>
                <option value="Hiển thị">Hiển thị</option>
                <option value="Đã ẩn">Đã ẩn</option>
              </select>
              <button className="btn btn-secondary" onClick={() => {setFilterName('');setFilterStatus('');}}>Bỏ lọc</button>
            </div>
            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr><th>ID</th><th>Tên Danh Mục</th><th>Số Lượng Cây</th><th>Trạng Thái</th><th>Hành Động</th></tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length > 0 ? filteredCategories.map(category => (
                            <tr key={category.id}>
                                <td data-label="id">{category.id}</td>
                                <td data-label="ten">{category.name}</td>
                                <td data-label="soluong">{typeof category.count === 'number' ? category.count : 0}</td>
                                <td data-label="trangthai">
                                  <span className={`status ${category.status === 'Hiển thị' ? 'status-visible' : 'status-hidden'}`}>{category.status}</span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-edit-category" onClick={() => handleEdit(category)}>Sửa</button>
                                    <button className={`btn btn-sm ${category.status === 'Hiển thị' ? 'btn-hide' : 'btn-show'}`} onClick={() => {
                                      const newStatus = category.status === 'Hiển thị' ? 'Đã ẩn' : 'Hiển thị';
                                      fetch(`${API_URL}/api/categories/${category.id}`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ ...category, status: newStatus })
                                      })
                                        .then(res => {
                                          if (!res.ok) throw new Error('Lỗi khi cập nhật trạng thái');
                                          return res.json();
                                        })
                                        .then(data => {
                                          setCategoriesData(categoriesData.map(c => c.id === data.id ? data : c));
                                        })
                                        .catch(err => alert(err.message));
                                    }}>{category.status === 'Hiển thị' ? 'Ẩn' : 'Hiện'}</button>
                                    <button className="btn btn-sm btn-delete-category" onClick={() => handleDelete(category.id)}>Xóa</button>
                                </td>
                            </tr>
                        )) : loading ? (
                          <tr><td colSpan="5">Đang tải dữ liệu...</td></tr>
                        ) : error ? (
                          <tr><td colSpan="5">Lỗi: {error}</td></tr>
                        ) : (
                          <tr><td colSpan="5">Không có dữ liệu.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
        {/* Modal thêm/sửa danh mục */}
        {modalOpen && editCategory && (
          <div style={{position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.35)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <form onSubmit={handleSaveEdit} style={{background:'#fff', padding:'2.5rem 2rem', borderRadius:'16px', minWidth:'350px', maxWidth:'600px', width:'100%', boxShadow:'0 8px 32px rgba(0,0,0,0.18)', position:'relative', display:'flex', flexWrap:'wrap', gap:'2rem'}}>
              <button type="button" onClick={closeModal} style={{position:'absolute', top:12, right:16, background:'none', border:'none', fontSize:'1.5rem', color:'#888', cursor:'pointer'}} title="Đóng">×</button>
              <div style={{flex:'1 1 320px', minWidth:'260px'}}>
                <h2 style={{marginBottom:'1.5rem', color:'#43d167', textAlign:'center'}}>{isAddMode ? 'Thêm Danh Mục' : 'Sửa Danh Mục'}</h2>
                <div className="form-group">
                  <label style={{fontWeight:'bold'}}>Tên danh mục</label>
                  <input name="name" value={editCategory.name || ''} onChange={handleEditChange} required style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}} />
                </div>
              </div>
              <div style={{flex:'1 1 320px', minWidth:'260px'}}>
                <div className="form-group">
                  <label style={{fontWeight:'bold'}}>Trạng thái</label>
                  <select name="status" value={editCategory.status || ''} onChange={handleEditChange} style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}}>
                    <option value="Hiển thị">Hiển thị</option>
                    <option value="Đã ẩn">Đã ẩn</option>
                  </select>
                </div>
              </div>
              <div style={{marginTop:'1.5rem', display:'flex', gap:'1rem', justifyContent:'flex-end', width:'100%'}}>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Hủy</button>
                <button type="submit" className="btn btn-primary">Lưu</button>
              </div>
            </form>
          </div>
        )}
    </div>
  );
}

export default CategoriesAdminPage;