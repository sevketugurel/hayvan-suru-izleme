import React from 'react';
import useDashboard from '../../hooks/useDashboard';
import { MetricsGrid } from '../../components/dashboard';
import { AlertsPanel, HealthSummaryPanel, LocationMapPanel } from '../../components/dashboard/panels';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const { loading, statistics, alerts, error, refreshData } = useDashboard();
  
  if (loading || !statistics) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Bir hata oluştu</h2>
        <p>{error.message}</p>
        <button onClick={refreshData} className="retry-button">
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>Kontrol Paneli</h1>
        <p className="page-description">SürüGözü çiftlik durumuna genel bakış</p>
      </div>
      
      {/* Önemli Metriklerin Özet Kartları */}
      <MetricsGrid statistics={statistics} />
      
      {/* Ana Paneller - Alt Kısım */}
      <div className="panels-grid">
        <AlertsPanel alerts={alerts} />
        <HealthSummaryPanel statistics={statistics} />
        <LocationMapPanel />
      </div>
    </div>
  );
};

export default DashboardPage; 