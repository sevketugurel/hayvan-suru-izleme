import React from 'react';
import { Panel, AlertItem } from '../';
import type { DashboardAlert } from '../../../types';

interface AlertsPanelProps {
  alerts: DashboardAlert[];
  maxAlerts?: number;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, maxAlerts = 4 }) => {
  return (
    <Panel 
      title="Kritik Uyarılar"
      linkTo="/alerts"
      colorType="alert"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
    >
      <div>
        {alerts.slice(0, maxAlerts).map(alert => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </Panel>
  );
};

export default AlertsPanel; 