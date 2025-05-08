import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import './MainLayout.css';
import '../styles/common.css';

const MainLayout: React.FC = () => {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content fixed-main">
          <Outlet />
        </main>
      </div>
      <footer className="footer fixed-footer">
        <p>© 2023 SürüGözü - Akıllı Çiftlik İzleme Platformu</p>
      </footer>
    </div>
  );
};

export default MainLayout; 