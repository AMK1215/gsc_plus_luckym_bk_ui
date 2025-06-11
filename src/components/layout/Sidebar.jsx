import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/dist/assets/img/AdminLTELogo.png';

const Sidebar = ({ open }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [treeOpen, setTreeOpen] = useState({
    dashboard: true,
    examples: false,
    ui: false,
  });

  const handleTreeToggle = (key) => {
    setTreeOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className={`app-sidebar bg-body-secondary shadow${open ? '' : ' collapsed'}`} data-bs-theme="dark">
      <div className="sidebar-brand">
        <a href="/" className="brand-link">
          <img
            src={logo}
            alt="AdminLTE Logo"
            className="brand-image opacity-75 shadow"
          />
          <span className="brand-text fw-light">LuckyM</span>
        </a>
      </div>
      <div className="sidebar-wrapper">
        <nav className="mt-2">
          <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="false">
            <li className="nav-header">DASHBOARD</li>
            <li className={`nav-item${treeOpen.dashboard ? ' menu-open' : ''}`}> 
              <a href="#" className={`nav-link${isActive('/') ? ' active' : ''}`} onClick={() => handleTreeToggle('dashboard')}>
                <i className="nav-icon bi bi-speedometer"></i>
                <p>
                  Dashboard
                  <i className="nav-arrow bi bi-chevron-right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview" style={{ display: treeOpen.dashboard ? 'block' : 'none' }}>
                <li className="nav-item">
                  <Link to="/" className={`nav-link${isActive('/') ? ' active' : ''}`}>
                    <i className="nav-icon bi bi-circle"></i>
                    <p>Dashboard v1</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/profile" className={`nav-link${isActive('/profile') ? ' active' : ''}`}>
                    <i className="nav-icon bi bi-circle"></i>
                    <p>Profile</p>
                  </Link>
                </li>

              </ul>
            </li>
            <li className="nav-header">EXAMPLES</li>
            <li className={`nav-item${treeOpen.examples ? ' menu-open' : ''}`}> 
              <a href="#" className={`nav-link${['/forms','/tables'].includes(location.pathname) ? ' active' : ''}`} onClick={() => handleTreeToggle('examples')}>
                <i className="nav-icon bi bi-folder"></i>
                <p>
                  Examples
                  <i className="nav-arrow bi bi-chevron-right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview" style={{ display: treeOpen.examples ? 'block' : 'none' }}>
                <li className="nav-item">
                  <Link to="/forms" className={`nav-link${isActive('/forms') ? ' active' : ''}`}>
                    <i className="nav-icon bi bi-ui-checks"></i>
                    <p>Forms</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tables" className={`nav-link${isActive('/tables') ? ' active' : ''}`}>
                    <i className="nav-icon bi bi-table"></i>
                    <p>Tables</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-header">Agent</li>
            <li className={`nav-item${treeOpen.ui ? ' menu-open' : ''}`}> 
              <a href="#" className={`nav-link${isActive('/ui') ? ' active' : ''}`} onClick={() => handleTreeToggle('ui')}>
                <i className="nav-icon bi bi-grid"></i>
                <p>
                  Agent
                  <i className="nav-arrow bi bi-chevron-right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview" style={{ display: treeOpen.ui ? 'block' : 'none' }}>
                <li className="nav-item">
                  <Link to="/ui" className={`nav-link${isActive('/ui') ? ' active' : ''}`}>
                    <i className="nav-icon bi bi-grid"></i>
                    <p>UI Elements</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/agent" className={`nav-link${isActive('/agent') ? ' active' : ''}`}>
                    <i className="nav-icon bi bi-grid"></i>
                    <p>Agent</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 