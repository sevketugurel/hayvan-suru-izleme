export interface Animal {
  id: string;
  name: string;
  tagNumber: string;
  species: string;
  age: number;
  gender?: string;
  breed?: string;
  weight?: number;
  location: string;
  lastSeen: string;
  status: 'active' | 'inactive' | 'warning';
  batteryLevel: number;
  heartRate: number;
  stressLevel: 'low' | 'medium' | 'high';
  bodyTemperature: number;
  heatCycle: 'inactive' | 'active' | 'peak';
  herdDistance: number; // Distance from the herd center in meters
}

export const animals: Animal[] = [
  {
    id: 'A001',
    name: 'Karabaş',
    tagNumber: 'TR1234567801',
    species: 'Koyun',
    age: 3,
    location: 'Kuzey Otlak',
    lastSeen: '2023-08-15T10:30:00',
    status: 'active',
    batteryLevel: 85,
    heartRate: 72,
    stressLevel: 'low',
    bodyTemperature: 38.5,
    heatCycle: 'inactive',
    herdDistance: 5
  },
  {
    id: 'A002',
    name: 'Benekli',
    tagNumber: 'TR1234567802',
    species: 'İnek',
    age: 5,
    location: 'Doğu Otlak',
    lastSeen: '2023-08-14T14:45:00',
    status: 'warning',
    batteryLevel: 32,
    heartRate: 95,
    stressLevel: 'high',
    bodyTemperature: 39.8,
    heatCycle: 'active',
    herdDistance: 120
  },
  {
    id: 'A003',
    name: 'Sarıkız',
    tagNumber: 'TR1234567803',
    species: 'Koyun',
    age: 7,
    location: 'Batı Otlak',
    lastSeen: '2023-08-15T08:20:00',
    status: 'active',
    batteryLevel: 78,
    heartRate: 68,
    stressLevel: 'low',
    bodyTemperature: 38.2,
    heatCycle: 'inactive',
    herdDistance: 15
  },
  {
    id: 'A004',
    name: 'Çakır',
    tagNumber: 'TR1234567804',
    species: 'İnek',
    age: 4,
    location: 'Güney Otlak',
    lastSeen: '2023-08-13T16:10:00',
    status: 'inactive',
    batteryLevel: 12,
    heartRate: 45,
    stressLevel: 'medium',
    bodyTemperature: 37.5,
    heatCycle: 'inactive',
    herdDistance: 250
  },
  {
    id: 'A005',
    name: 'Kınalı',
    tagNumber: 'TR1234567805',
    species: 'Keçi',
    age: 2,
    location: 'Orta Otlak',
    lastSeen: '2023-08-15T11:50:00',
    status: 'active',
    batteryLevel: 90,
    heartRate: 75,
    stressLevel: 'low',
    bodyTemperature: 38.4,
    heatCycle: 'peak',
    herdDistance: 8
  },
  {
    id: 'A006',
    name: 'Yıldız',
    tagNumber: 'TR1234567806',
    species: 'At',
    age: 6,
    location: 'Kuzey Otlak',
    lastSeen: '2023-08-15T09:15:00',
    status: 'active',
    batteryLevel: 92,
    heartRate: 65,
    stressLevel: 'low',
    bodyTemperature: 38.0,
    heatCycle: 'inactive',
    herdDistance: 10
  },
  {
    id: 'A007',
    name: 'Boğaç',
    tagNumber: 'TR1234567807',
    species: 'Boğa',
    age: 4,
    location: 'Doğu Otlak',
    lastSeen: '2023-08-14T12:30:00',
    status: 'active',
    batteryLevel: 78,
    heartRate: 80,
    stressLevel: 'medium',
    bodyTemperature: 38.7,
    heatCycle: 'inactive',
    herdDistance: 45
  }
]; 