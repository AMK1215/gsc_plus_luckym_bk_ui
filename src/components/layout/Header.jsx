import React, { useState, useRef, useEffect } from 'react';
import userlogo from '../../assets/dist/assets/img/user7-128x128.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onSidebarToggle }) => {
  const [notiOpen, setNotiOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notiRef = useRef();
  const userRef = useRef();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (notiRef.current && !notiRef.current.contains(e.target)) setNotiOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Dark mode toggle
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
  }, [dark]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="app-header navbar navbar-expand bg-body">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={onSidebarToggle} style={{border:0,background:'none'}}>
              <i className="bi bi-list"></i>
            </button>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link">Home</a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link">Contact</a>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => setDark((d) => !d)} title="Toggle dark mode" style={{border:0,background:'none'}}>
              <i className={`bi ${dark ? 'bi-moon-stars-fill' : 'bi-brightness-high-fill'}`}></i>
            </button>
          </li>
          <li className="nav-item dropdown" ref={notiRef}>
            <button className="nav-link btn btn-link position-relative" onClick={() => setNotiOpen((o) => !o)} style={{border:0,background:'none'}}>
              <i className="bi bi-bell-fill"></i>
              <span className="navbar-badge badge text-bg-warning">15</span>
            </button>
            {notiOpen && (
              <div className="dropdown-menu show dropdown-menu-lg dropdown-menu-end">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="bi bi-envelope me-2"></i> 4 new messages
                  <span className="float-end text-secondary fs-7">3 mins</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="bi bi-people-fill me-2"></i> 8 friend requests
                  <span className="float-end text-secondary fs-7">12 hours</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="bi bi-file-earmark-fill me-2"></i> 3 new reports
                  <span className="float-end text-secondary fs-7">2 days</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item dropdown-footer"> See All Notifications </a>
              </div>
            )}
          </li>
          <li className="nav-item dropdown user-menu" ref={userRef}>
            <button className="nav-link dropdown-toggle btn btn-link d-flex align-items-center" onClick={() => setUserOpen((o) => !o)} style={{border:0,background:'none'}}>
              <img
                src={userlogo}
                className="user-image rounded-circle shadow"
                alt="User Image"
              />
              <span className="d-none d-md-inline ms-2">
                {user?.name || 'User'}
                {user?.balance && (
                  <span className="badge bg-success ms-2">${user.balance}</span>
                )}
              </span>
            </button>
            {userOpen && (
              <ul className="dropdown-menu show dropdown-menu-lg dropdown-menu-end">
                <li className="user-header text-bg-primary">
                  <img
                    src={userlogo}
                    className="rounded-circle shadow"
                    alt="User Image"
                  />
                  <p>
                    {user?.name || 'User'}
                    <small>Member since Nov. 2023</small>
                  </p>
                </li>
                <li className="user-footer">
                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header; 