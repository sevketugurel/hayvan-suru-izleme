import React, { useEffect } from 'react';
import { useAnimalStore, useAlertStore } from '../../store';

const DashboardPage: React.FC = () => {
  const { animals, fetchAnimals } = useAnimalStore();
  const { alerts, fetchAlerts } = useAlertStore();

  useEffect(() => {
    fetchAnimals();
    fetchAlerts();
  }, [fetchAnimals, fetchAlerts]);

  // Basit istatistikler
  const activeAnimals = animals.filter(a => a.status === 'active').length;
  const warningAnimals = animals.filter(a => a.status === 'warning').length;
  const inactiveAnimals = animals.filter(a => a.status === 'inactive').length;
  const unreadAlerts = alerts.filter(a => !a.isRead).length;

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Aktif Hayvanlar</h3>
          <p className="stat-value">{activeAnimals}</p>
        </div>
        <div className="stat-card warning">
          <h3>Uyarı Durumunda</h3>
          <p className="stat-value">{warningAnimals}</p>
        </div>
        <div className="stat-card danger">
          <h3>İnaktif</h3>
          <p className="stat-value">{inactiveAnimals}</p>
        </div>
        <div className="stat-card alert">
          <h3>Okunmamış Uyarılar</h3>
          <p className="stat-value">{unreadAlerts}</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Son Aktivite</h2>
        <ul className="activity-list">
          {animals.slice(0, 3).map(animal => (
            <li key={animal.id} className="activity-item">
              <span className="activity-time">{new Date(animal.lastSeen).toLocaleTimeString()}</span>
              <span className="activity-text">
                <strong>{animal.name}</strong> - {animal.location} bölgesinde görüldü
              </span>
            </li>
          ))}
          {alerts.slice(0, 3).map(alert => (
            <li key={alert.id} className="activity-item alert">
              <span className="activity-time">{new Date(alert.timestamp).toLocaleTimeString()}</span>
              <span className="activity-text">
                <strong>{alert.animalName}</strong> - {alert.message}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage; 