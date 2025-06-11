import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  // Set sidebar closed by default on mobile, open on desktop
  const getInitialSidebarState = () => window.innerWidth >= 992;
  const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarState);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = () => setSidebarOpen((open) => !open);

  // Add a backdrop for mobile when sidebar is open
  const isMobile = window.innerWidth < 992;

  return (
    <div className={`app-wrapper d-flex${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
      <Sidebar open={sidebarOpen} />
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 1040,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <Header onSidebarToggle={handleSidebarToggle} />
        <main className="app-main flex-grow-1">
          <div className="app-content-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <h3 className="mb-0">Dashboard</h3>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-end">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="app-content">
            <div className="container-fluid">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
