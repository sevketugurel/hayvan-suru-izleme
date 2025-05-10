import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import './Sidebar.css';

interface SubmenuItem {
  to: string;
  label: string;
  icon?: string;
}

interface MenuItem {
  to: string;
  icon: string;
  label: string;
  badge?: number;
  submenu?: SubmenuItem[];
  keywords?: string[];
}

const Sidebar: React.FC = () => {
  const { isMobileDevice, isMobileSidebarOpen, toggleMobileSidebar, checkMobileDevice } = useUIStore();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      checkMobileDevice();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkMobileDevice]);

  const navItems: MenuItem[] = [
    { to: '/', icon: 'home', label: 'Kontrol Paneli', keywords: ['dashboard', 'ana sayfa', 'özet'] },
    { 
      to: '/animals', 
      icon: 'animal', 
      label: 'Hayvanlar',
      keywords: ['hayvan', 'sürü', 'takip', 'izleme'],
      submenu: [
        { to: '/animals/active', label: 'Aktif Hayvanlar' },
        { to: '/animals/archived', label: 'Arşivlenen Hayvanlar' },
        { to: '/animals/groups', label: 'Gruplar' },
      ]
    },
    { to: '/alerts', icon: 'alert', label: 'Uyarılar', badge: 3, keywords: ['alarm', 'bildirim', 'uyarı'] },
    { 
      to: '/reports', 
      icon: 'report', 
      label: 'Raporlar',
      keywords: ['rapor', 'analiz', 'istatistik']
    },
    { to: '/settings', icon: 'settings', label: 'Ayarlar', keywords: ['ayar', 'tercih', 'yapılandırma'] },
  ];

  const farmItems: MenuItem[] = [
    { to: '/devices', icon: 'device', label: 'Cihazlar', keywords: ['cihaz', 'donanım', 'ekipman'] },
    { to: '/users', icon: 'user', label: 'Kullanıcılar', keywords: ['kullanıcı', 'personel', 'üye'] },
  ];

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = [...navItems, ...farmItems].filter(item => 
      item.label.toLowerCase().includes(term) || 
      (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(term)))
    );

    setSearchResults(results);
  }, [searchTerm]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'home':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'animal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'alert':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'report':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'settings':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'device':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'add':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
      case 'scan':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        );
      case 'notification':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      case 'sun':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'moon':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleOverlayClick = () => {
    if (isMobileDevice) {
      toggleMobileSidebar();
    }
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme');
  };

  const renderMenuItem = (item: MenuItem, isSubmenuItem = false) => {
    return item.submenu ? (
      <div 
        key={item.to} 
        className={`has-submenu${openSubmenu === item.label ? ' open' : ''}`}
      >
        <div 
          className="menu-item"
          onClick={() => toggleSubmenu(item.label)}
        >
          <span className="menu-item-icon">
            {getIcon(item.icon)}
          </span>
          <span className="menu-item-text">{item.label}</span>
          {item.badge && <span className="menu-badge">{item.badge}</span>}
          <span className="submenu-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
        
        <div className="submenu">
          {item.submenu.map(subitem => (
            <NavLink
              key={subitem.to}
              to={subitem.to}
              className={({ isActive }) =>
                `menu-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="menu-item-text">{subitem.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    ) : (
      <div key={item.to} className="menu-item-wrapper">
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            `menu-item ${isActive ? 'active' : ''}`
          }
        >
          <span className="menu-item-icon">
            {getIcon(item.icon)}
          </span>
          <span className="menu-item-text">{item.label}</span>
          {item.badge && <span className="menu-badge">{item.badge}</span>}
        </NavLink>
      </div>
    );
  };

  const sidebarClass = isMobileDevice 
    ? `sidebar ${isMobileSidebarOpen ? 'open' : ''}`
    : 'sidebar fixed-sidebar';

  return (
    <>
      {isMobileDevice && isMobileSidebarOpen && (
        <div 
          className="sidebar-overlay visible" 
          onClick={handleOverlayClick}
        ></div>
      )}
      
      <aside className={sidebarClass}>
        {isMobileDevice && isMobileSidebarOpen && (
          <button 
            className="mobile-sidebar-close" 
            onClick={toggleMobileSidebar}
            aria-label="Menüyü Kapat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        <div className="sidebar-search">
          <div className="search-input-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Menüde Ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="search-clear" 
                onClick={() => setSearchTerm('')}
                aria-label="Aramayı Temizle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="sidebar-menu">
          {searchTerm ? (
            <div className="sidebar-section">
              <div className="sidebar-section-title">Arama Sonuçları</div>
              {searchResults.length > 0 ? (
                searchResults.map(item => renderMenuItem(item))
              ) : (
                <div className="empty-state">
                  <p>Sonuç bulunamadı</p>
                </div>
              )}
            </div>
          ) : (
            <>              
              <div className="sidebar-section">
                <div className="sidebar-section-title">Ana Menü</div>
                {navItems.map(item => renderMenuItem(item))}
              </div>
              
              <div className="sidebar-section">
                <div className="sidebar-section-title">Çiftlik Yönetimi</div>
                {farmItems.map(item => renderMenuItem(item))}
              </div>
            </>
          )}
        </div>
        
        <div className="sidebar-footer">
          <div className="version-info">
            <span>SürüGözü v1.0.0</span>
            <span>Son Güncelleme: 08.2023</span>
          </div>
          
          <div className="quick-actions">
            <button className="quick-action-button" title="Yeni Hayvan Ekle">
              <span className="quick-action-icon">{getIcon('add')}</span>
              <span className="quick-action-label">Ekle</span>
            </button>
            <button className="quick-action-button" title="QR Kodu Tara">
              <span className="quick-action-icon">{getIcon('scan')}</span>
              <span className="quick-action-label">Tara</span>
            </button>
            <button className="quick-action-button" title="Bildirimleri Görüntüle">
              <span className="quick-action-icon">{getIcon('notification')}</span>
              <span className="quick-action-label">Bildirim</span>
            </button>
          </div>
          
          <button className="sidebar-theme-toggle" onClick={toggleTheme} title={isDarkMode ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}>
            <span className="theme-toggle-icon">
              {isDarkMode ? getIcon('sun') : getIcon('moon')}
            </span>
            <span className="theme-toggle-label">
              {isDarkMode ? 'Açık Tema' : 'Koyu Tema'}
            </span>
          </button>

          <div className="sidebar-keyboard-shortcuts">
            <button className="keyboard-shortcut-button" title="Klavye Kısayolları">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Klavye Kısayolları</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 