import React from 'react';
import { Link } from 'react-router-dom';
import type { Animal } from '../../../mocks';
import './AnimalCard.css';

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  // Helper function to get the proper color class based on the health parameters
  const getHeartRateClass = (heartRate: number): string => {
    if (heartRate > 90) return 'high';
    if (heartRate < 60) return 'low';
    return 'normal';
  };

  const getStressLevelClass = (level: string): string => {
    switch(level) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'normal';
      default: return '';
    }
  };

  const getTemperatureClass = (temp: number): string => {
    if (temp > 39.5) return 'high';
    if (temp < 37.5) return 'low';
    return 'normal';
  };

  const getHeatCycleIcon = (cycle: string): JSX.Element => {
    switch(cycle) {
      case 'peak':
        return <span className="heat-cycle-icon peak" title="Kızgınlık Döneminde (Zirve)">●</span>;
      case 'active':
        return <span className="heat-cycle-icon active" title="Kızgınlık Döneminde">●</span>;
      default:
        return <span className="heat-cycle-icon inactive" title="Kızgınlık Döneminde Değil">○</span>;
    }
  };

  const getHerdDistanceClass = (distance: number): string => {
    if (distance > 100) return 'high';
    if (distance > 50) return 'medium';
    return 'normal';
  };

  const getFormattedDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`animal-card ${animal.status}`}>
      <div className="card-header">
        <div className="tag-number">{animal.tagNumber}</div>
        <div className={`status-indicator ${animal.status}`}>
          {animal.status === 'active' && 'Aktif'}
          {animal.status === 'warning' && 'Uyarı'}
          {animal.status === 'inactive' && 'İnaktif'}
        </div>
      </div>
      
      <h3 className="animal-name">{animal.name}</h3>
      <div className="animal-species">{animal.species}</div>
      
      <div className="animal-stats">
        <div className="stat-group">
          <div className="stat-label">Nabız</div>
          <div className={`stat-value heart-rate ${getHeartRateClass(animal.heartRate)}`}>
            {animal.heartRate} <small>bpm</small>
          </div>
        </div>
        
        <div className="stat-group">
          <div className="stat-label">Stres</div>
          <div className={`stat-value stress-level ${getStressLevelClass(animal.stressLevel)}`}>
            <span className="indicator-dot"></span>
            {animal.stressLevel === 'high' && 'Yüksek'}
            {animal.stressLevel === 'medium' && 'Orta'}
            {animal.stressLevel === 'low' && 'Düşük'}
          </div>
        </div>
        
        <div className="stat-group">
          <div className="stat-label">Sıcaklık</div>
          <div className={`stat-value temperature ${getTemperatureClass(animal.bodyTemperature)}`}>
            {animal.bodyTemperature.toFixed(1)}°C
          </div>
        </div>
      </div>
      
      <div className="animal-details">
        <div className="detail-item">
          <div className="detail-label">Kızgınlık</div>
          <div className="detail-value heat-cycle-cell">
            {getHeatCycleIcon(animal.heatCycle)}
          </div>
        </div>
        
        <div className="detail-item">
          <div className="detail-label">Sürü Uzaklığı</div>
          <div className={`detail-value herd-distance ${getHerdDistanceClass(animal.herdDistance)}`}>
            {animal.herdDistance}m
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <div className="last-seen">
          Son Görülme: {getFormattedDate(animal.lastSeen)}
        </div>
        <Link to={`/animals/${animal.id}`} className="view-details-btn">
          Detay
        </Link>
      </div>
    </div>
  );
};

export default AnimalCard; 