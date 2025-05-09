import React, { useEffect } from 'react';
import { useAlertStore } from '../../store';

const AlertsPage: React.FC = () => {
  const { alerts, loading, fetchAlerts, markAsRead } = useAlertStore();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="alerts-page">
      <h1>Uyarılar</h1>

      <div className="alerts-filters">
        <div>
          <label>Filtrele: </label>
          <select>
            <option value="all">Tümü</option>
            <option value="battery">Pil</option>
            <option value="location">Konum</option>
            <option value="health">Sağlık</option>
            <option value="system">Sistem</option>
          </select>
        </div>
        <div>
          <label>Sırala: </label>
          <select>
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="severity">Önem Derecesi</option>
          </select>
        </div>
      </div>

      <div className="alerts-list">
        {alerts.length === 0 ? (
          <p>Uyarı bulunamadı</p>
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
                <h3>{alert.animalName}</h3>
                <p>{alert.message}</p>
              </div>
              <div className="alert-actions">
                <button onClick={() => handleMarkAsRead(alert.id)} disabled={alert.isRead}>
                  {alert.isRead ? 'Okundu' : 'Okundu İşaretle'}
                </button>
                <button>Detaylar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPage; 