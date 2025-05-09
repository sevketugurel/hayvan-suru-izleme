export interface Alert {
  id: string;
  animalId: string;
  animalName: string;
  type: 'battery' | 'location' | 'health' | 'system';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  isRead: boolean;
}

export const alerts: Alert[] = [
  {
    id: 'AL001',
    animalId: 'A002',
    animalName: 'Kartal',
    type: 'battery',
    message: 'Düşük pil seviyesi - %32',
    timestamp: '2023-08-14T15:30:00',
    severity: 'medium',
    isRead: false
  },
  {
    id: 'AL002',
    animalId: 'A004',
    animalName: 'Geyik',
    type: 'battery',
    message: 'Kritik pil seviyesi - %12',
    timestamp: '2023-08-13T18:45:00',
    severity: 'high',
    isRead: true
  },
  {
    id: 'AL003',
    animalId: 'A001',
    animalName: 'Kurt',
    type: 'location',
    message: 'İzleme alanı dışına çıktı',
    timestamp: '2023-08-15T09:20:00',
    severity: 'medium',
    isRead: false
  },
  {
    id: 'AL004',
    animalId: 'A003',
    animalName: 'Ayı',
    type: 'health',
    message: 'Anormal hareket tespit edildi',
    timestamp: '2023-08-14T22:10:00',
    severity: 'high',
    isRead: false
  },
  {
    id: 'AL005',
    animalId: 'A005',
    animalName: 'Tilki',
    type: 'system',
    message: 'Cihaz bağlantısı kesildi',
    timestamp: '2023-08-12T14:30:00',
    severity: 'low',
    isRead: true
  }
]; 