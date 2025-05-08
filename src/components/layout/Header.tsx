import React, { useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import './Header.css';

const Header: React.FC = () => {
  const { isMobileDevice, toggleMobileSidebar, checkMobileDevice } = useUIStore();

  // Ekran boyutu değişikliklerini izle
  useEffect(() => {
    checkMobileDevice();
    window.addEventListener('resize', checkMobileDevice);
    return () => window.removeEventListener('resize', checkMobileDevice);
  }, [checkMobileDevice]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          {/* Sadece mobil cihazlarda görünecek menü butonu */}
          {isMobileDevice && (
            <button
              onClick={toggleMobileSidebar}
              className="header-button mobile-menu-button"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <div className="logo-text">
            <span>Sürü</span>Gözü
          </div>
        </div>
        
        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Hayvan veya sensör ara..." 
          />
        </div>
        
        <div className="header-actions">
          <button className="header-button has-badge" aria-label="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="notification-badge">3</span>
          </button>
          
          <button className="header-button" aria-label="Settings">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          <div className="user-menu">
            <div className="user-avatar">
              A
            </div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Çiftlik Yöneticisi</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 