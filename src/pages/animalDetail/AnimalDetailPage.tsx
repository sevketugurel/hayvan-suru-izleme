import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAnimalStore, useAlertStore } from '../../store';

const AnimalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedAnimal, fetchAnimalById } = useAnimalStore();
  const { filteredAlerts, fetchAlertsByAnimalId } = useAlertStore();

  useEffect(() => {
    if (id) {
      fetchAnimalById(id);
      fetchAlertsByAnimalId(id);
    }
  }, [id, fetchAnimalById, fetchAlertsByAnimalId]);

  if (!selectedAnimal) {
    return <div className="loading">Hayvan bilgileri yükleniyor...</div>;
  }

  return (
    <div className="animal-detail-page max-w-7xl mx-auto">
      <div className="animal-header">
        <h1>{selectedAnimal.name} (#{selectedAnimal.id})</h1>
        <span className={`status-badge ${selectedAnimal.status}`}>
          {selectedAnimal.status === 'active' && 'Aktif'}
          {selectedAnimal.status === 'warning' && 'Uyarı'}
          {selectedAnimal.status === 'inactive' && 'İnaktif'}
        </span>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h2>Genel Bilgiler</h2>
          <div className="detail-item">
            <span className="label">Tür:</span>
            <span className="value">{selectedAnimal.species}</span>
          </div>
          <div className="detail-item">
            <span className="label">Yaş:</span>
            <span className="value">{selectedAnimal.age}</span>
          </div>
          <div className="detail-item">
            <span className="label">Son Görülme:</span>
            <span className="value">{new Date(selectedAnimal.lastSeen).toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span className="label">Pil Seviyesi:</span>
            <span className="value">{selectedAnimal.batteryLevel}%</span>
          </div>
        </div>

        <div className="detail-card">
          <h2>Konum Bilgisi</h2>
          <div className="location-info">
            <p className="current-location">Şu anda: {selectedAnimal.location}</p>
            <div className="map-placeholder">
              <p>Harita burada gösterilecek</p>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-alerts">
        <h2>Son Uyarılar</h2>
        {filteredAlerts.length === 0 ? (
          <p>Bu hayvan için uyarı bulunmamaktadır.</p>
        ) : (
          <div className="alert-list">
            {filteredAlerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.severity}`}>
                <span className="alert-time">{new Date(alert.timestamp).toLocaleString()}</span>
                <span className="alert-message">{alert.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalDetailPage; 