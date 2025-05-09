import { useState, useEffect } from 'react';
import type { DashboardStatistics, DashboardAlert } from '../types';
import { fetchDashboardStatistics, fetchDashboardAlerts } from '../services/dashboard';

type DashboardState = {
  loading: boolean;
  statistics: DashboardStatistics | null;
  alerts: DashboardAlert[];
  error: Error | null;
};

const useDashboard = () => {
  const [state, setState] = useState<DashboardState>({
    loading: true,
    statistics: null,
    alerts: [],
    error: null
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Paralel veri çekimi
      const [statsData, alertsData] = await Promise.all([
        fetchDashboardStatistics(),
        fetchDashboardAlerts()
      ]);
      
      setState({
        loading: false,
        statistics: statsData,
        alerts: alertsData,
        error: null
      });
    } catch (error) {
      console.error('Dashboard verisi yüklenirken hata:', error);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error : new Error('Bilinmeyen hata oluştu')
      }));
    }
  };

  // İlk yükleme esnasında verileri çek
  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };

  return {
    ...state,
    refreshData
  };
};

export default useDashboard; 