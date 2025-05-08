import React, { useState } from 'react';
import useDashboard from '../../hooks/useDashboard';
import { MetricsGrid } from '../../components/dashboard';
import { 
  AlertsPanel, 
  HealthSummaryPanel, 
  LocationMapPanel,
  WeatherPanel,
  ActivityTimelinePanel,
  FeedConsumptionPanel
} from '../../components/dashboard/panels';
import './DashboardPage.css';

// Tab tipleri
type TabType = 'overview' | 'health' | 'feeding' | 'location';

const DashboardPage: React.FC = () => {
  const { loading, statistics, alerts, error, refreshData } = useDashboard();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
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

  // Veri güncelleme işlevi
  const handleRefreshData = () => {
    refreshData();
    setLastUpdate(new Date());
  };

  // Özet metni oluşturma
  const getSummaryText = () => {
    const healthyPercentage = Math.round((statistics.healthyAnimals / statistics.totalAnimals) * 100);
    const riskyPercentage = Math.round((statistics.riskyAnimals / statistics.totalAnimals) * 100);
    const inHeatCount = statistics.inHeatAnimals;
    const criticalAlertCount = alerts.filter(a => a.type === 'critical').length;
    const totalAlertCount = alerts.length;
    
    return (
      <>
        Sürünüzün genel durumu <span className={healthyPercentage > 90 ? "summary-good" : healthyPercentage > 75 ? "summary-average" : "summary-warning"}>
          {healthyPercentage}% sağlıklı
        </span> seviyesinde. 
        {riskyPercentage > 15 && <span className="summary-caution"> Risk altındaki hayvanların oranı %{riskyPercentage}.</span>}
        {inHeatCount > 0 && <span> Şu anda {inHeatCount} hayvan kızgınlık döneminde.</span>}
        {criticalAlertCount > 0 ? 
          <span className="summary-alert"> Toplamda <strong>{criticalAlertCount}</strong> adet kritik uyarı mevcut!</span> : 
          totalAlertCount > 0 ? 
          <span> Toplamda {totalAlertCount} uyarı bulunuyor.</span> : 
          <span className="summary-good"> Hiçbir kritik uyarı bulunmuyor.</span>}
      </>
    );
  };

  // Seçilen sekmeye göre farklı içerikler gösterilecek
  const renderTabContent = () => {
    switch (activeTab) {
      case 'health':
        return (
          <>
            {/* Sağlık sekmesi için içerik */}
            <div className="panels-grid">
              <div className="two-thirds-panel">
                <HealthSummaryPanel statistics={statistics} />
              </div>
              <div>
                <ActivityTimelinePanel />
              </div>
              <div className="full-width-panel">
                {/* Buraya gelecekte sağlık özet grafiği eklenebilir */}
              </div>
            </div>
          </>
        );
      case 'feeding':
        return (
          <>
            {/* Beslenme sekmesi için içerik */}
            <div className="panels-grid">
              <div className="two-thirds-panel">
                <FeedConsumptionPanel />
              </div>
              <div>
                <WeatherPanel />
              </div>
            </div>
          </>
        );
      case 'location':
        return (
          <>
            {/* Konum sekmesi için içerik */}
            <div className="panels-grid">
              <div className="full-width-panel">
                <LocationMapPanel />
              </div>
              <div>
                <ActivityTimelinePanel />
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            {/* Genel görünüm sekmesi içeriği (varsayılan) */}
            <MetricsGrid statistics={statistics} />
            
            <div className="panels-grid">
              <AlertsPanel alerts={alerts} />
              <HealthSummaryPanel statistics={statistics} />
              <WeatherPanel />
              <LocationMapPanel />
              <FeedConsumptionPanel />
              <ActivityTimelinePanel />
            </div>
          </>
        );
    }
  };

  const formatLastUpdate = (date: Date) => {
    return `${date.toLocaleDateString('tr-TR')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>Kontrol Paneli</h1>
      </div>
      
      {/* Özet Bölümü - Yukarı taşındı */}
      <div className="dashboard-summary">
        <div className="summary-content">
          <div className="summary-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="summary-text">
            {getSummaryText()}
          </div>
        </div>
        <div className="summary-actions">
          <div className="last-update">
            Son güncelleme: {formatLastUpdate(lastUpdate)}
          </div>
          <button onClick={handleRefreshData} className="refresh-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Verileri Güncelle
          </button>
        </div>
      </div>
      
      {/* Sekme Menüsü */}
      <div className="dashboard-tabs">
        <div 
          className={`dashboard-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Genel Görünüm
        </div>
        <div 
          className={`dashboard-tab ${activeTab === 'health' ? 'active' : ''}`}
          onClick={() => setActiveTab('health')}
        >
          Sağlık Durumu
        </div>
        <div 
          className={`dashboard-tab ${activeTab === 'feeding' ? 'active' : ''}`}
          onClick={() => setActiveTab('feeding')}
        >
          Beslenme
        </div>
        <div 
          className={`dashboard-tab ${activeTab === 'location' ? 'active' : ''}`}
          onClick={() => setActiveTab('location')}
        >
          Konum Takibi
          {alerts.filter(a => a.type === 'critical').length > 0 && 
            <span className="notification-badge">{alerts.filter(a => a.type === 'critical').length}</span>}
        </div>
      </div>
      
      {/* Seçilen sekmenin içeriği */}
      {renderTabContent()}
    </div>
  );
};

export default DashboardPage;