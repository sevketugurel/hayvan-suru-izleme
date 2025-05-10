import React from 'react';
import { Link } from 'react-router-dom';
import type { Animal } from '../../../mocks';
import './AnimalTable.css';

interface AnimalTableProps {
  animals: Animal[];
}

const AnimalTable: React.FC<AnimalTableProps> = ({ animals }) => {
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

  if (animals.length === 0) {
    return <div className="no-animals">Hayvan bulunamadı.</div>;
  }

  return (
    <div className="animal-table-container">
      <table className="animal-table">
        <thead>
          <tr>
            <th>Küpe No</th>
            <th>Adı</th>
            <th>Tür</th>
            <th>Durum</th>
            <th>Nabız</th>
            <th>Stres</th>
            <th>Sıcaklık</th>
            <th>Kızgınlık</th>
            <th>Sürü Uzaklığı</th>
            <th>Son Görülme</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal => (
            <tr key={animal.id} className={`animal-row ${animal.status}`}>
              <td>{animal.tagNumber}</td>
              <td>{animal.name}</td>
              <td>{animal.species}</td>
              <td>
                <span className={`status-indicator ${animal.status}`}>
                  {animal.status === 'active' && 'Aktif'}
                  {animal.status === 'warning' && 'Uyarı'}
                  {animal.status === 'inactive' && 'İnaktif'}
                </span>
              </td>
              <td>
                <div className={`heart-rate ${getHeartRateClass(animal.heartRate)}`}>
                  {animal.heartRate} <small>bpm</small>
                </div>
              </td>
              <td>
                <div className={`stress-level ${getStressLevelClass(animal.stressLevel)}`}>
                  <span className="indicator-dot"></span>
                  {animal.stressLevel === 'high' && 'Yüksek'}
                  {animal.stressLevel === 'medium' && 'Orta'}
                  {animal.stressLevel === 'low' && 'Düşük'}
                </div>
              </td>
              <td>
                <div className={`temperature ${getTemperatureClass(animal.bodyTemperature)}`}>
                  {animal.bodyTemperature.toFixed(1)}°C
                </div>
              </td>
              <td className="heat-cycle-cell">
                {getHeatCycleIcon(animal.heatCycle)}
              </td>
              <td>
                <div className={`herd-distance ${getHerdDistanceClass(animal.herdDistance)}`}>
                  {animal.herdDistance}m
                </div>
              </td>
              <td>{getFormattedDate(animal.lastSeen)}</td>
              <td>
                <Link to={`/animals/${animal.id}`} className="view-details-btn">
                  Detay
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimalTable; 