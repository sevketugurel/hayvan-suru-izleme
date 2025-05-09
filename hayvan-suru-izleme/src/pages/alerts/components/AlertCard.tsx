import React from 'react';
import { Link } from 'react-router-dom';
import type { Alert } from '../../../mocks';
import './AlertCard.css';

interface AlertCardProps {
  alert: Alert;
  onMarkAsRead: (id: string) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onMarkAsRead }) => {
  const getTypeIcon = (type: string): string => {
    switch(type) {
      case 'battery': return '🔋';
      case 'location': return '📍';
      case 'health': return '❤️';
      case 'system': return '⚙️';
      default: return '🔔';
    }
  };

  const getTypeText = (type: string): string => {
    switch(type) {
      case 'battery': return 'Pil';
      case 'location': return 'Konum';
      case 'health': return 'Sağlık';
      case 'system': return 'Sistem';
      default: return 'Genel';
    }
  };

  const getSeverityText = (severity: string): string => {
    switch(severity) {
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      case 'low': return 'Düşük';
      default: return '';
    }
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
    <div className={`alert-card ${alert.severity} ${alert.isRead ? 'read' : 'unread'}`}>
      <div className="card-header">
        <div className="alert-type">
          <span className="type-icon">{getTypeIcon(alert.type)}</span>
          <span className="type-text">
            {getTypeText(alert.type)}
          </span>
        </div>
        <div className={`severity-indicator ${alert.severity}`}>
          {getSeverityText(alert.severity)}
        </div>
      </div>
      
      <h3 className="animal-name">{alert.animalName}</h3>
      <p className="alert-message">{alert.message}</p>
      
      <div className="card-footer">
        <div className="timestamp">
          {getFormattedDate(alert.timestamp)}
        </div>
        <div className="alert-actions">
          <button 
            onClick={() => onMarkAsRead(alert.id)} 
            className="read-btn"
            disabled={alert.isRead}
          >
            {alert.isRead ? 'Okundu' : 'Okundu İşaretle'}
          </button>
          <Link to={`/animals/${alert.animalId}`} className="details-btn">
            Detaylar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlertCard; 