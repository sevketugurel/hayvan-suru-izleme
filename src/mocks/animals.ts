export interface Animal {
  id: string;
  name: string;
  species: string;
  age: number;
  location: string;
  lastSeen: string;
  status: 'active' | 'inactive' | 'warning';
  batteryLevel: number;
}

export const animals: Animal[] = [
  {
    id: 'A001',
    name: 'Kurt',
    species: 'Canis lupus',
    age: 3,
    location: 'Kuzey Ormanı',
    lastSeen: '2023-08-15T10:30:00',
    status: 'active',
    batteryLevel: 85
  },
  {
    id: 'A002',
    name: 'Kartal',
    species: 'Aquila chrysaetos',
    age: 5,
    location: 'Doğu Tepeleri',
    lastSeen: '2023-08-14T14:45:00',
    status: 'warning',
    batteryLevel: 32
  },
  {
    id: 'A003',
    name: 'Ayı',
    species: 'Ursus arctos',
    age: 7,
    location: 'Batı Ormanı',
    lastSeen: '2023-08-15T08:20:00',
    status: 'active',
    batteryLevel: 78
  },
  {
    id: 'A004',
    name: 'Geyik',
    species: 'Cervus elaphus',
    age: 4,
    location: 'Güney Vadisi',
    lastSeen: '2023-08-13T16:10:00',
    status: 'inactive',
    batteryLevel: 12
  },
  {
    id: 'A005',
    name: 'Tilki',
    species: 'Vulpes vulpes',
    age: 2,
    location: 'Orta Ova',
    lastSeen: '2023-08-15T11:50:00',
    status: 'active',
    batteryLevel: 90
  }
]; 