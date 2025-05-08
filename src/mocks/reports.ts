// Mock report types
export const mockReportTypes = [
  { id: 'health', name: 'Sağlık Raporu' },
  { id: 'activity', name: 'Aktivite ve Davranış Raporu' },
  { id: 'reproduction', name: 'Üreme Performansı Raporu' },
  { id: 'herd', name: 'Sürü Dinamikleri Raporu' },
  { id: 'location', name: 'Konum Aktivite Raporu' },
];

// Mock animals for filter
export const mockReportAnimals = [
  { id: 'A001', name: 'Bella', tag: '#A001' },
  { id: 'A002', name: 'Max', tag: '#A002' },
  { id: 'A003', name: 'Luna', tag: '#A003' },
  { id: 'A004', name: 'Rocky', tag: '#A004' },
  { id: 'A005', name: 'Daisy', tag: '#A005' },
];

// Mock health data for report results
export const mockHealthData = [
  {
    animalId: 'A001',
    name: 'Bella',
    tag: '#A001',
    heartRate: 75,
    temperature: 38.2,
    activityLevel: 78,
    stressLevel: 'Düşük',
  },
  {
    animalId: 'A002',
    name: 'Max',
    tag: '#A002',
    heartRate: 82,
    temperature: 38.5,
    activityLevel: 65,
    stressLevel: 'Orta',
  },
  {
    animalId: 'A003',
    name: 'Luna',
    tag: '#A003',
    heartRate: 78,
    temperature: 38.1,
    activityLevel: 82,
    stressLevel: 'Düşük',
  },
  {
    animalId: 'A004',
    name: 'Rocky',
    tag: '#A004',
    heartRate: 88,
    temperature: 39.1,
    activityLevel: 45,
    stressLevel: 'Yüksek',
  },
  {
    animalId: 'A005',
    name: 'Daisy',
    tag: '#A005',
    heartRate: 72,
    temperature: 38.3,
    activityLevel: 70,
    stressLevel: 'Orta',
  },
];

// Mock saved reports
export const mockSavedReports = [
  {
    id: 'r1',
    name: 'Aylık Sağlık Özeti - Haziran 2023',
    type: 'health',
    createdAt: '2023-06-30T14:25:00Z',
    filterParams: {
      startDate: '2023-06-01',
      endDate: '2023-06-30',
      animalId: '',
    },
  },
  {
    id: 'r2',
    name: 'Üreme Performansı Q2 2023',
    type: 'reproduction',
    createdAt: '2023-07-05T11:35:00Z',
    filterParams: {
      startDate: '2023-04-01',
      endDate: '2023-06-30',
      animalId: '',
    },
  },
]; 