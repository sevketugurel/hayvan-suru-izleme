import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                <Link to={`/animals/${animal.id}`} className="animal-link">
                  <strong>{animal.name}</strong>
                </Link> - {animal.location} bölgesinde görüldü
              </span>
            </li>
          ))}
          {alerts.slice(0, 3).map(alert => (
            <li key={alert.id} className="activity-item alert">
              <span className="activity-time">{new Date(alert.timestamp).toLocaleTimeString()}</span>
              <span className="activity-text">
                <Link to={`/animals/${alert.animalId}`} className="animal-link">
                  <strong>{alert.animalName}</strong>
                </Link> - {alert.message}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="recent-animals">
        <h2>Son Eklenen Hayvanlar</h2>
        <div className="animal-cards">
          {animals.slice(0, 4).map(animal => (
            <div key={animal.id} className="animal-card">
              <h3>{animal.name}</h3>
              <p>ID: {animal.id}</p>
              <p>Durum: {animal.status === 'active' ? 'Aktif' : animal.status === 'warning' ? 'Uyarı' : 'İnaktif'}</p>
              <Link to={`/animals/${animal.id}`} className="view-details-btn">
                Detayları Gör
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;