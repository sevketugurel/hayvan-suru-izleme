import React, { useEffect, useState } from 'react';
import { useAlertStore } from '../../store';
import AlertCardGrid from './components/AlertCardGrid';
import AlertFilters from './components/AlertFilters';
import './AlertsPage.css';

const AlertsPage: React.FC = () => {
  const { alerts, loading, error, fetchAlerts, markAsRead } = useAlertStore();
  const [filteredAlerts, setFilteredAlerts] = useState(alerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterSeverity, setFilterSeverity] = useState<string>('');

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  useEffect(() => {
    let result = alerts;

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(alert => 
        alert.animalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType) {
      result = result.filter(alert => alert.type === filterType);
    }

    // Apply severity filter
    if (filterSeverity) {
      result = result.filter(alert => alert.severity === filterSeverity);
    }

    setFilteredAlerts(result);
  }, [alerts, searchTerm, filterType, filterSeverity]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'type') {
      setFilterType(value);
    } else if (key === 'severity') {
      setFilterSeverity(value);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterSeverity('');
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="alerts-page">
      <h1 className="alerts-title">Uyarılar</h1>

      <AlertFilters 
        searchTerm={searchTerm}
        filterType={filterType}
        filterSeverity={filterSeverity}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      <AlertCardGrid 
        alerts={filteredAlerts} 
        onMarkAsRead={handleMarkAsRead} 
      />
    </div>
  );
};

export default AlertsPage; 