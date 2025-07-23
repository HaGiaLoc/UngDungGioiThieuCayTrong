import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faLeaf, 
  faTags, 
  faImages, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2><Link to="/admin/dashboard">🌿 Garden Admin</Link></h2>
      </div>
      <nav className="admin-nav">
        <ul>
          <li>
            <NavLink to="/admin/dashboard">
              <FontAwesomeIcon icon={faTachometerAlt} className="sidebar-icon" /> Tổng quan
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/plants">
              <FontAwesomeIcon icon={faLeaf} className="sidebar-icon" /> Quản Lý Cây
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories">
              <FontAwesomeIcon icon={faTags} className="sidebar-icon" /> Quản Lý Danh Mục
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/images">
              <FontAwesomeIcon icon={faImages} className="sidebar-icon" /> Quản Lý Ảnh
            </NavLink>
          </li>
          
          <li>
            <button type="button" onClick={handleLogout} className="logout-btn">
              <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" /> Đăng Xuất
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;