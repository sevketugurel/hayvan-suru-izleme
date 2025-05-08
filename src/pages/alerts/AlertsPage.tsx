import React, { useEffect } from 'react';
import { useAlertStore } from '../../store';
import './AlertsPage.css';

const AlertsPage: React.FC = () => {
  const { alerts, loading, fetchAlerts, markAsRead } = useAlertStore();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="alerts-page">
      <div className="page-header">
        <h1>Uyarılar</h1>
        <p className="page-description">Sistem ve hayvan izleme uyarıları</p>
      </div>

      <div className="filter-container">
        <div className="filter-group">
          <label className="filter-label">Filtrele: </label>
          <select className="filter-select">
            <option value="all">Tümü</option>
            <option value="battery">Pil</option>
            <option value="location">Konum</option>
            <option value="health">Sağlık</option>
            <option value="system">Sistem</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Sırala: </label>
          <select className="filter-select">
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="severity">Önem Derecesi</option>
          </select>
        </div>
      </div>

      <div className="alerts-list">
        {alerts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p>Uyarı bulunamadı</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`alert-card ${alert.severity} ${alert.isRead ? 'read' : 'unread'}`}
            >
              <div className="alert-header">
                <span className="alert-type">{alert.type}</span>
                <span className="alert-time">{new Date(alert.timestamp).toLocaleString()}</span>
              </div>
              <div className="alert-content">
                <h3 className="alert-title">{alert.animalName}</h3>
                <p className="alert-message">{alert.message}</p>
              </div>
              <div className="alert-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleMarkAsRead(alert.id)} 
                  disabled={alert.isRead}
                >
                  {alert.isRead ? 'Okundu' : 'Okundu İşaretle'}
                </button>
                <button className="btn btn-primary">Detaylar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPage; 