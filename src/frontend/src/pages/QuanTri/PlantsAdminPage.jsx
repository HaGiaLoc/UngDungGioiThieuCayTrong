// src/pages/QuanTri/PlantsAdminPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function PlantsAdminPage() {
  const navigate = useNavigate();
  const [plantsData, setPlantsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editPlant, setEditPlant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  // State cho filter
  const [filterName, setFilterName] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/api/plants`)
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
        return res.json();
      })
      .then(data => setPlantsData(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
    // Lấy danh mục
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data.filter(c => c.status === 'Hiển thị')))
      .catch(() => setCategories([]));
    // Lấy danh sách ảnh
    fetch(`${API_URL}/api/images`)
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(() => setImages([]));
  }, []);

  // Xóa cây
  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa cây này?')) return;
    fetch(`${API_URL}/api/plants/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi xóa');
        setPlantsData(plantsData.filter(p => p.id !== id));
      })
      .catch(err => alert(err.message));
  };

  // Ẩn/Hiện cây
  const handleToggleStatus = (plant) => {
    const newStatus = plant.status === 'Hiển thị' ? 'Ẩn' : 'Hiển thị';
    fetch(`${API_URL}/api/plants/${plant.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi cập nhật trạng thái');
        setPlantsData(plantsData.map(p => p.id === plant.id ? { ...p, status: newStatus } : p));
      })
      .catch(err => alert(err.message));
  };

  // Sửa cây: mở modal
  const handleEdit = (plant) => {
    setEditPlant({ ...plant });
    setIsAddMode(false);
    setModalOpen(true);
  };

  // Thêm cây: mở modal với form rỗng
  const handleAdd = () => {
    setEditPlant({ name: '', description: '', status: 'Hiển thị', image: '' });
    setIsAddMode(true);
    setModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setModalOpen(false);
    setEditPlant(null);
    setIsAddMode(false);
  };

  // Xử lý thay đổi input trong modal
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    // Xử lý riêng cho care
    if (name.startsWith('care.')) {
      const careField = name.split('.')[1];
      setEditPlant(prev => ({
        ...prev,
        care: { ...prev.care, [careField]: value }
      }));
    } else {
      setEditPlant(prev => ({ ...prev, [name]: value }));
    }
  };

  // Lưu cập nhật hoặc thêm mới
  const handleSaveEdit = (e) => {
    e.preventDefault();
    // Chuyển gallery, features từ chuỗi sang mảng (dùng dấu chấm phẩy)
    const plantToSave = {
      ...editPlant,
      gallery: typeof editPlant.gallery === 'string' ? editPlant.gallery.split(';').map(s => s.trim()).filter(Boolean) : (editPlant.gallery || []),
      features: typeof editPlant.features === 'string' ? editPlant.features.split(';').map(s => s.trim()).filter(Boolean) : (editPlant.features || []),
      care: editPlant.care || {},
      featured: editPlant.featured === 'true' || editPlant.featured === true,
    };
    if (isAddMode) {
      fetch(`${API_URL}/api/plants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plantToSave)
      })
        .then(res => {
          if (!res.ok) throw new Error('Lỗi khi thêm cây');
          return res.json();
        })
        .then(data => {
          setPlantsData([data, ...plantsData]);
          closeModal();
        })
        .catch(err => alert(err.message));
    } else {
      fetch(`${API_URL}/api/plants/${editPlant.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plantToSave)
      })
        .then(res => {
          if (!res.ok) throw new Error('Lỗi khi cập nhật');
          return res.json();
        })
        .then(data => {
          setPlantsData(plantsData.map(p => p.id === data.id ? data : p));
          closeModal();
        })
        .catch(err => alert(err.message));
    }
  };

  // Lọc dữ liệu trên client
  const filteredPlants = plantsData.filter(plant => {
    const matchName = plant.name.toLowerCase().includes(filterName.toLowerCase());
    const matchCategory = filterCategory ? (plant.category === filterCategory) : true;
    const matchStatus = filterStatus ? (plant.status === filterStatus) : true;
    return matchName && matchCategory && matchStatus;
  });

  // Lấy danh sách danh mục duy nhất
  const uniqueCategories = Array.from(new Set(plantsData.map(p => p.category).filter(Boolean)));

  return (
    <div id="plants" className="content-page active">
      <header className="content-header" style={{padding: '20px'}}>
        <h1>Quản Lý Giới Thiệu Cây</h1>
        <button className="btn btn-primary" onClick={handleAdd}><i className="fas fa-plus"></i> Thêm Cây Mới</button>
      </header>
      <section className="content-section">
        <h2>Danh Sách Cây</h2>
        <div className="list-filters">
          <input type="text" placeholder="Tìm tên cây..." value={filterName} onChange={e => setFilterName(e.target.value)} />
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="">Tất cả danh mục</option>
            {uniqueCategories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">Tất cả trạng thái</option>
            <option value="Hiển thị">Hiển thị</option>
            <option value="Ẩn">Ẩn</option>
          </select>
          <button className="btn btn-secondary" onClick={() => {setFilterName('');setFilterCategory('');setFilterStatus('');}}>Bỏ lọc</button>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>Ảnh</th><th>Tên Cây</th><th>Danh Mục</th><th>Trạng Thái</th><th>Hành Động</th></tr>
            </thead>
            <tbody>
              {filteredPlants.length > 0 ? filteredPlants.map(plant => (
                <tr key={plant.id}>
                  <td data-label="id">{plant.id}</td>
                  <td data-label="anh">
                    <div style={{position:'relative', width:'120px', height:'90px', margin:'0 auto'}} className="plant-img-hover-box">
                      <img src={plant.image ? plant.image : "https://via.placeholder.com/50x50/90EE90/000?text=Cây"} alt="Ảnh" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'10px'}} />
                    </div>
                  </td>
                  <td data-label="tencay">{plant.name}</td>
                  <td data-label="danhmuc">{plant.category}</td>
                  <td data-label="trangthai">
                    <span className={`status ${plant.status === 'Hiển thị' ? 'status-visible' : 'status-hidden'}`}>{plant.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-edit-plant" onClick={() => handleEdit(plant)}>Sửa</button>
                    <button
                      className={`btn btn-sm ${plant.status === 'Hiển thị' ? 'btn-hide' : 'btn-show'}`}
                      onClick={() => handleToggleStatus(plant)}
                    >
                      {plant.status === 'Hiển thị' ? 'Ẩn' : 'Hiện'}
                    </button>
                    <button className="btn btn-sm btn-delete-plant" onClick={() => handleDelete(plant.id)}>Xóa</button>
                  </td>
                </tr>
              )) : loading ? (
                <tr><td colSpan="6">Đang tải dữ liệu...</td></tr>
              ) : error ? (
                <tr><td colSpan="6">Lỗi: {error}</td></tr>
              ) : (
                <tr><td colSpan="6">Không có dữ liệu.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal sửa/thêm cây */}
      {modalOpen && editPlant && (
        <div style={{position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.35)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <form onSubmit={handleSaveEdit} style={{background:'#fff', padding:'2.5rem 2rem', borderRadius:'16px', minWidth:'350px', maxWidth:'900px', width:'100%', boxShadow:'0 8px 32px rgba(0,0,0,0.18)', position:'relative', display:'flex', flexWrap:'wrap', gap:'2rem'}}>
            <button type="button" onClick={closeModal} style={{position:'absolute', top:12, right:16, background:'none', border:'none', fontSize:'1.5rem', color:'#888', cursor:'pointer'}} title="Đóng">×</button>
            <div style={{flex:'1 1 320px', minWidth:'260px'}}>
              <h2 style={{marginBottom:'1.5rem', color:'#43d167', textAlign:'center'}}>{isAddMode ? 'Thêm Cây Mới' : 'Sửa Cây'}</h2>
              <div className="form-group">
                <label style={{fontWeight:'bold'}}>Tên cây</label>
                <input name="name" value={editPlant.name || ''} onChange={handleEditChange} required style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}} />
              </div>
              <div className="form-group">
                <label style={{fontWeight:'bold'}}>Mô tả</label>
                <textarea name="description" value={editPlant.description || ''} onChange={handleEditChange} rows={3} style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}} />
              </div>
              <div className="form-group">
                <label style={{fontWeight:'bold'}}>Ảnh (tên file)</label>
                {images.length > 0 ? (
                  <select name="image" value={editPlant.image || ''} onChange={handleEditChange} style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}} required>
                    <option value="">-- Chọn ảnh --</option>
                    {images.map(img => <option key={img.id} value={img.src}>{img.name}</option>)}
                  </select>
                ) : (
                  <input name="image" value={editPlant.image || ''} onChange={handleEditChange} style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}} />
                )}
              </div>
              <div className="form-group">
                <label style={{fontWeight:'bold'}}>Danh mục</label>
                {categories.length > 0 ? (
                  <select name="category" value={editPlant.category || ''} onChange={handleEditChange} style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}} required>
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                  </select>
                ) : (
                  <input name="category" value={editPlant.category || ''} onChange={handleEditChange} style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}} />
                )}
              </div>
            </div>
            <div style={{flex:'1 1 320px', minWidth:'260px'}}>
              <div className="form-group">
                <label style={{fontWeight:'bold'}}>Trạng thái</label>
                <select name="status" value={editPlant.status || ''} onChange={handleEditChange} style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}}>
                  <option value="Hiển thị">Hiển thị</option>
                  <option value="Ẩn">Ẩn</option>
                </select>
              </div>
              <div className="form-group">
                <label style={{fontWeight:'bold'}}>Nổi bật</label>
                <select name="featured" value={editPlant.featured === true || editPlant.featured === 'true' ? 'true' : 'false'} onChange={handleEditChange} style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}}>
                  <option value="false">Không</option>
                  <option value="true">Có</option>
                </select>
              </div>
              <div className="form-group">
                <label style={{fontWeight:'bold'}}>Đặc điểm nổi bật (cách nhau dấu chấm phẩy)</label>
                <input name="features" value={Array.isArray(editPlant.features) ? editPlant.features.join('; ') : (editPlant.features || '')} onChange={handleEditChange} style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}} placeholder="Lọc không khí; Dễ chăm sóc" />
              </div>
              <div className="form-group">
                <label style={{fontWeight:'bold'}}>Hướng dẫn chăm sóc</label>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
                  <input name="care.light" value={editPlant.care?.light || ''} onChange={handleEditChange} placeholder="Ánh sáng" style={{padding:'8px', borderRadius:'6px', border:'1px solid #ccc'}} />
                  <input name="care.water" value={editPlant.care?.water || ''} onChange={handleEditChange} placeholder="Nước" style={{padding:'8px', borderRadius:'6px', border:'1px solid #ccc'}} />
                  <input name="care.soil" value={editPlant.care?.soil || ''} onChange={handleEditChange} placeholder="Đất" style={{padding:'8px', borderRadius:'6px', border:'1px solid #ccc'}} />
                  <input name="care.temp" value={editPlant.care?.temp || ''} onChange={handleEditChange} placeholder="Nhiệt độ" style={{padding:'8px', borderRadius:'6px', border:'1px solid #ccc'}} />
                </div>
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

export default PlantsAdminPage;