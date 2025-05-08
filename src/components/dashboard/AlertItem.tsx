import React from 'react';
import type { DashboardAlert } from '../../types';

interface AlertItemProps {
  alert: DashboardAlert;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert }) => {
  const { type, animalName, animalId, message, timestamp } = alert;
  
  return (
    <div className={`alert-item ${type}`}>
      <div className="alert-item-header">
        <div className="alert-item-animal">
          <span className={`status-indicator ${type}`}></span>
          <p>{animalName}</p>
          <span className="animal-id">{animalId}</span>
        </div>
        <p className="alert-time">
          {new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </p>
      </div>
      <p className="alert-message">{message}</p>
    </div>
  );
};

export default AlertItem; 