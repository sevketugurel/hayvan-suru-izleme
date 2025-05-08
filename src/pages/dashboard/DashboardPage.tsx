import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockDashboardStatistics, mockDashboardAlerts } from '../../mocks';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>Kontrol Paneli</h1>
        <p className="page-description">SürüGözü çiftlik durumuna genel bakış</p>
      </div>
      
      {/* Önemli Metriklerin Özet Kartları */}
      <div className="metrics-grid">
        <div className="metric-card blue">
          <div className="metric-card-content">
            <div className="metric-info">
              <p>Toplam Hayvan</p>
              <p className="metric-value">{mockDashboardStatistics.totalAnimals}</p>
            </div>
            <div className="metric-icon blue">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="metric-card green">
          <div className="metric-card-content">
            <div className="metric-info">
              <p>Sağlıklı</p>
              <p className="metric-value">{mockDashboardStatistics.healthyAnimals}</p>
            </div>
            <div className="metric-icon green">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="metric-card amber">
          <div className="metric-card-content">
            <div className="metric-info">
              <p>Riskli</p>
              <p className="metric-value">{mockDashboardStatistics.riskyAnimals}</p>
            </div>
            <div className="metric-icon amber">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="metric-card pink">
          <div className="metric-card-content">
            <div className="metric-info">
              <p>Kızgınlık</p>
              <p className="metric-value">{mockDashboardStatistics.inHeatAnimals}</p>
            </div>
            <div className="metric-icon pink">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="metric-card purple">
          <div className="metric-card-content">
            <div className="metric-info">
              <p>Doğum Yakın</p>
              <p className="metric-value">{mockDashboardStatistics.approachingBirthAnimals}</p>
            </div>
            <div className="metric-icon purple">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="metric-card blue">
          <div className="metric-card-content">
            <div className="metric-info">
              <p>Sürüden Ayrı</p>
              <p className="metric-value">{mockDashboardStatistics.isolatedAnimals}</p>
            </div>
            <div className="metric-icon blue">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ana Paneller - Alt Kısım */}
      <div className="panels-grid">
        {/* Kritik Uyarılar */}
        <div className="panel">
          <div className="alert-panel-header">
            <div className="panel-header-content">
              <svg xmlns="http://www.w3.org/2000/svg" className="panel-icon" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="panel-title">Kritik Uyarılar</h2>
            </div>
            <Link to="/alerts" className="panel-link">
              Tümünü Gör
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="panel-body">
            <div>
              {mockDashboardAlerts.slice(0, 4).map(alert => (
                <div key={alert.id} 
                  className={`alert-item ${
                    alert.type === 'critical' ? 'critical' : 
                    alert.type === 'high' ? 'high' : 
                    'medium'
                  }`}
                >
                  <div className="alert-item-header">
                    <div className="alert-item-animal">
                      <span 
                        className={`status-indicator ${
                          alert.type === 'critical' ? 'critical' : 
                          alert.type === 'high' ? 'high' : 
                          'medium'
                        }`}
                      ></span>
                      <p>{alert.animalName}</p>
                      <span className="animal-id">
                        {alert.animalId}
                      </span>
                    </div>
                    <p className="alert-time">
                      {new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                  <p className="alert-message">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Hayvan Sağlık Durumu */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-header-content">
              <svg xmlns="http://www.w3.org/2000/svg" className="panel-icon" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="panel-title">Sağlık Durumu Özeti</h2>
            </div>
          </div>
          <div className="panel-body">
            <div className="progress-container">
              <div className="progress-header">
                <span className="progress-label">Genel Sürü Sağlığı</span>
                <span className="progress-value green">
                  {Math.round((mockDashboardStatistics.healthyAnimals / mockDashboardStatistics.totalAnimals) * 100)}%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill green" 
                  style={{ width: `${(mockDashboardStatistics.healthyAnimals / mockDashboardStatistics.totalAnimals) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="progress-container">
              <div className="progress-header">
                <span className="progress-label">Stres Seviyesi</span>
                <span className="progress-value amber">
                  {Math.round((mockDashboardStatistics.highStressAnimals / mockDashboardStatistics.totalAnimals) * 100)}%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill amber" 
                  style={{ width: `${(mockDashboardStatistics.highStressAnimals / mockDashboardStatistics.totalAnimals) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="action-buttons">
              <Link to="/reports?type=health" className="action-button green">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Sağlık Raporu
              </Link>
              <Link to="/animals?filter=health" className="action-button blue">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Detaylı Görüntüle
              </Link>
            </div>
          </div>
        </div>
        
        {/* Konum Haritası */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-header-content">
              <svg xmlns="http://www.w3.org/2000/svg" className="panel-icon" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h2 className="panel-title">Konum Haritası</h2>
            </div>
            <div>
              <select className="filter-select">
                <option>Tüm Bölgeler</option>
                <option>Kuzey Mera</option>
                <option>Güney Mera</option>
                <option>Doğu Mera</option>
              </select>
            </div>
          </div>
          <div className="panel-body">
            {/* Harita mockup - gerçek uygulamada LeafletJS veya Google Maps entegrasyonu */}
            <div className="map-container" style={{ height: '220px', background: '#e5e7eb', borderRadius: '0.5rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <p style={{ marginBottom: '0.5rem', color: '#6b7280' }}>Harita Görünümü</p>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Gerçek uygulamada buraya harita entegrasyonu yapılacak</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 