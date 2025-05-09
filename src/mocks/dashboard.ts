// Dashboard mock statistics
export const mockDashboardStatistics = {
  totalAnimals: 156,
  healthyAnimals: 142,
  riskyAnimals: 14,
  highStressAnimals: 8,
  inHeatAnimals: 6,
  approachingBirthAnimals: 3,
  drowningRiskAnimals: 2,
  isolatedAnimals: 5,
};

// Mock alert data for dashboard
export const mockDashboardAlerts = [
  {
    id: 'a1',
    type: 'critical',
    animalId: 'A123',
    animalName: 'Bella',
    message: 'Sürüden ayrıldı, riskli bölgede',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'a2',
    type: 'high',
    animalId: 'A145',
    animalName: 'Max',
    message: 'Yüksek stres seviyesi tespit edildi',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'a3',
    type: 'medium',
    animalId: 'A156',
    animalName: 'Luna',
    message: 'Kızgınlık belirtileri gözlendi',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'a4',
    type: 'medium',
    animalId: 'A178',
    animalName: 'Rocky',
    message: 'Düşük aktivite seviyesi',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 'a5',
    type: 'high',
    animalId: 'A189',
    animalName: 'Daisy',
    message: 'Anormal vücut sıcaklığı',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
]; 