export interface DashboardStatistics {
  totalAnimals: number;
  healthyAnimals: number;
  riskyAnimals: number;
  highStressAnimals: number;
  inHeatAnimals: number;
  approachingBirthAnimals: number;
  drowningRiskAnimals: number;
  isolatedAnimals: number;
}

export interface DashboardAlert {
  id: string;
  type: 'critical' | 'high' | 'medium';
  animalId: string;
  animalName: string;
  message: string;
  timestamp: string;
}

export type MetricCardType = 'blue' | 'green' | 'amber' | 'pink' | 'purple'; 