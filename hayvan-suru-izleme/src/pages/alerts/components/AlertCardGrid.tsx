import React from 'react';
import type { Alert } from '../../../mocks';
import AlertCard from './AlertCard';
import './AlertCardGrid.css';

interface AlertCardGridProps {
  alerts: Alert[];
  onMarkAsRead: (id: string) => void;
}

const AlertCardGrid: React.FC<AlertCardGridProps> = ({ alerts, onMarkAsRead }) => {
  if (alerts.length === 0) {
    return <div className="no-alerts">Uyarı bulunamadı.</div>;
  }

  return (
    <div className="alert-card-grid">
      {alerts.map(alert => (
        <div key={alert.id} className="alert-card-grid-item">
          <AlertCard alert={alert} onMarkAsRead={onMarkAsRead} />
        </div>
      ))}
    </div>
  );
};

export default AlertCardGrid; 