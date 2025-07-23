import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function ImagesAdminPage() {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editImage, setEditImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
        if (!token) {
            navigate('/login');
        }
        setLoading(true);
        setError(null);
        fetch(`${API_URL}/api/images`)
            .then(res => {
                if (!res.ok) throw new Error('Lỗi khi lấy ảnh');
                return res.json();
            })
            .then(imgs => setImages(imgs))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [navigate]);

    // Thêm ảnh
    const handleAdd = () => {
        setEditImage({ name: '', src: '' });
        setIsAddMode(true);
        setModalOpen(true);
    };
    // Sửa ảnh
    const handleEdit = (img) => {
        setEditImage({ ...img });
        setIsAddMode(false);
        setModalOpen(true);
    };
    // Đóng modal
    const closeModal = () => {
        setModalOpen(false);
        setEditImage(null);
        setIsAddMode(false);
    };
    // Xử lý thay đổi input
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditImage(prev => ({ ...prev, [name]: value }));
    };
    // Lưu cập nhật/thêm mới
    const handleSaveEdit = (e) => {
        e.preventDefault();
        if (isAddMode) {
            fetch(`${API_URL}/api/images`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editImage)
            })
                .then(res => {
                    if (!res.ok) throw new Error('Lỗi khi thêm ảnh');
                    return res.json();
                })
                .then(data => {
                    setImages([data, ...images]);
                    closeModal();
                })
                .catch(err => alert(err.message));
        } else {
            fetch(`${API_URL}/api/images/${editImage.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editImage)
            })
                .then(res => {
                    if (!res.ok) throw new Error('Lỗi khi cập nhật');
                    return res.json();
                })
                .then(data => {
                    setImages(images.map(img => img.id === data.id ? data : img));
                    closeModal();
                })
                .catch(err => alert(err.message));
        }
    };
    // Xóa ảnh
    const handleDelete = (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa ảnh này?')) return;
        fetch(`${API_URL}/api/images/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Lỗi khi xóa');
                setImages(images.filter(img => img.id !== id));
            })
            .catch(err => alert(err.message));
    };
    // Lọc client
    const filteredImages = images.filter(img => {
        return img.name.toLowerCase().includes(filterName.toLowerCase());
    });

    return (
        <div id="images" className="content-page active">
            <header className="content-header" style={{padding: '20px'}}>
                <h1>Quản Lý Thư Viện Ảnh</h1>
                <button className="btn btn-primary" onClick={handleAdd}><i className="fas fa-upload"></i> Tải Ảnh Lên</button>
            </header>
            <section className="content-section">
                <h2>Thư Viện Ảnh</h2>
                <div className="list-filters">
                    <input type="text" placeholder="Tìm tên file ảnh..." value={filterName} onChange={e => setFilterName(e.target.value)} />
                    <button className="btn btn-secondary" onClick={() => setFilterName('')}>Bỏ lọc</button>
                </div>
                <div className="image-gallery-grid">
                    {filteredImages.length > 0 ? filteredImages.map(img => (
                        <div className="gallery-item image-img-hover-box" key={img.id} style={{position:'relative', width:'180px', margin:'0 auto'}}>
                            <img src={img.src} alt={img.name} style={{width:'100%', height:'140px', objectFit:'cover', borderRadius:'12px'}} />
                            <div className="image-action-btns" style={{position:'absolute', top:'12px', right:'12px', display:'flex', gap:'6px', opacity:0, transition:'opacity 0.2s'}}>
                                <button className="btn btn-xs btn-edit-image" style={{padding:'4px 10px', fontSize:'0.95rem', borderRadius:'6px'}} onClick={() => handleEdit(img)}>Sửa</button>
                                <button className="btn btn-xs btn-delete-image" style={{padding:'4px 10px', fontSize:'0.95rem', borderRadius:'6px'}} onClick={() => handleDelete(img.id)}>Xóa</button>
                            </div>
                            <div style={{textAlign:'center', marginTop:'8px', fontWeight:'bold', color:'#333', fontSize:'1rem'}}>{img.name}</div>
                        </div>
                    )) : loading ? (
                        <div>Đang tải dữ liệu...</div>
                    ) : error ? (
                        <div>Lỗi: {error}</div>
                    ) : (
                        <div>Không có dữ liệu.</div>
                    )}
                </div>
            </section>
            {modalOpen && editImage && (
                <div style={{position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.35)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <form onSubmit={handleSaveEdit} style={{background:'#fff', padding:'2.5rem 2rem', borderRadius:'16px', minWidth:'350px', maxWidth:'700px', width:'100%', boxShadow:'0 8px 32px rgba(0,0,0,0.18)', position:'relative', display:'flex', flexWrap:'wrap', gap:'2rem'}}>
                    <button type="button" onClick={closeModal} style={{position:'absolute', top:12, right:16, background:'none', border:'none', fontSize:'1.5rem', color:'#888', cursor:'pointer'}} title="Đóng">×</button>
                    <div style={{flex:'1 1 320px', minWidth:'260px'}}>
                      <h2 style={{marginBottom:'1.5rem', color:'#43d167', textAlign:'center'}}>{isAddMode ? 'Thêm Ảnh' : 'Sửa Ảnh'}</h2>
                      <div className="form-group">
                        <label style={{fontWeight:'bold'}}>Tên file ảnh</label>
                        <input name="name" value={editImage.name || ''} onChange={handleEditChange} required style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}} />
                      </div>
                      <div className="form-group">
                        <label style={{fontWeight:'bold'}}>Đường dẫn ảnh (src)</label>
                        <input name="src" value={editImage.src || ''} onChange={handleEditChange} required style={{width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'1rem'}} />
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

export default ImagesAdminPage;