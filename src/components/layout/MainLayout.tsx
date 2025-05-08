import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useUIStore } from '../../store/uiStore';

const MainLayout: React.FC = () => {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main 
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <Outlet />
        </main>
      </div>
      <footer className="py-4 px-6 text-center text-gray-500 text-sm border-t">
        <p>© 2023 SürüGözü - Akıllı Çiftlik İzleme Platformu</p>
      </footer>
    </div>
  );
};

export default MainLayout; 