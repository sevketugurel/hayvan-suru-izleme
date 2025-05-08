import { mockDashboardStatistics, mockDashboardAlerts } from '../mocks/dashboard';
import type { DashboardStatistics, DashboardAlert } from '../types';

export const fetchDashboardStatistics = async (): Promise<DashboardStatistics> => {
  // Gerçek API çağrısı burada yapılacaktır
  // Şimdilik mock veriyi kullanıyoruz
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardStatistics);
    }, 800);
  });
};

export const fetchDashboardAlerts = async (): Promise<DashboardAlert[]> => {
  // Gerçek API çağrısı burada yapılacaktır
  // Şimdilik mock veriyi kullanıyoruz
  return new Promise((resolve) => {
    setTimeout(() => {
      // Alert tiplerinin doğru şekilde dönüştürülmesini sağlıyoruz
      const typedAlerts = mockDashboardAlerts.map(alert => ({
        ...alert,
        type: alert.type as 'critical' | 'high' | 'medium'
      }));
      resolve(typedAlerts);
    }, 800);
  });
}; 