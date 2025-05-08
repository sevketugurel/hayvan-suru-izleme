import React from 'react';
import { Panel, ProgressBar, ActionButton } from '../';
import type { DashboardStatistics } from '../../../types';

interface HealthSummaryPanelProps {
  statistics: DashboardStatistics;
}

const HealthSummaryPanel: React.FC<HealthSummaryPanelProps> = ({ statistics }) => {
  const healthPercentage = statistics.healthyAnimals / statistics.totalAnimals;
  const stressPercentage = statistics.highStressAnimals / statistics.totalAnimals;
  
  return (
    <Panel 
      title="Sağlık Durumu Özeti"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      }
    >
      <ProgressBar
        label="Genel Sürü Sağlığı"
        value={healthPercentage}
        colorClass="green"
      />
      
      <ProgressBar
        label="Stres Seviyesi"
        value={stressPercentage}
        colorClass="amber"
      />
      
      <div className="action-buttons">
        <ActionButton
          to="/reports?type=health"
          className="green"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        >
          Sağlık Raporu
        </ActionButton>
        
        <ActionButton
          to="/animals?filter=health"
          className="blue"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        >
          Detaylı Görüntüle
        </ActionButton>
      </div>
    </Panel>
  );
};

export default HealthSummaryPanel; 