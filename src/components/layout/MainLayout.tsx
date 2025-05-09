import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>© 2023 Hayvan İzleme Sistemi</p>
      </footer>
    </div>
  );
};

export default MainLayout; 