import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAnimalStore } from "../../store";
import { formatDateTime } from "../../utils";

const AnimalsPage: React.FC = () => {
  const { animals, loading, error, fetchAnimals } = useAnimalStore();

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  if (loading) {
    return <div className="loading">Hayvanlar yükleniyor...</div>;
  }

  if (error) {
    return <div className="error">Hata: {error}</div>;
  }

  return (
    <div className="animals-page max-w-7xl mx-auto">
      <h1>Hayvanlar</h1>
      
      <div className="animals-filters">
        <input type="text" placeholder="Hayvan ara..." />
        <select>
          <option value="all">Tüm Durumlar</option>
          <option value="active">Aktif</option>
          <option value="warning">Uyarı</option>
          <option value="inactive">İnaktif</option>
        </select>
      </div>
      
      <div className="animals-list">
        {animals.length === 0 ? (
          <p>Hayvan bulunamadı.</p>
        ) : (
          animals.map(animal => (
            <div 
              key={animal.id} 
              className={`animal-card ${animal.status}`}
            >
              <div className="animal-header">
                <h3>{animal.name} - #{animal.id}</h3>
                <span className={`status-indicator ${animal.status}`}></span>
              </div>
              <div className="animal-info">
                <p><strong>Tür:</strong> {animal.species}</p>
                <p><strong>Yaş:</strong> {animal.age}</p>
                <p><strong>Konum:</strong> {animal.location}</p>
                <p><strong>Son Görülme:</strong> {formatDateTime(animal.lastSeen)}</p>
                <p><strong>Pil:</strong> {animal.batteryLevel}%</p>
              </div>
              <div className="animal-actions">
                <Link to={`/animals/${animal.id}`} className="details-button">
                  Detaylar
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnimalsPage; 