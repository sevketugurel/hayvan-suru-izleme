import React from 'react';
import { Panel } from '../';

// Örnek aktivite verileri - gerçek uygulamada API'den gelecektir
const activities = [
  {
    id: 1,
    animalId: 'A1042',
    animalName: 'Sarıkız',
    activityType: 'movement',
    description: 'Alışılmışın dışında hareket algılandı',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 dakika önce
    importance: 'high'
  },
  {
    id: 2,
    animalId: 'A1088',
    animalName: 'Karabaş',
    activityType: 'eating',
    description: 'Yem tüketimi başladı',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 saat önce
    importance: 'normal'
  },
  {
    id: 3,
    animalId: 'A1035',
    animalName: 'Pembe',
    activityType: 'health',
    description: 'Sağlık kontrolü tamamlandı',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 saat önce
    importance: 'normal'
  },
  {
    id: 4,
    animalId: 'A1072',
    animalName: 'Benekli',
    activityType: 'location',
    description: 'Başka bir bölgeye geçiş yaptı',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 saat önce
    importance: 'normal'
  },
  {
    id: 5,
    animalId: 'A1001',
    animalName: 'Duman',
    activityType: 'rest',
    description: 'Uzun dinlenme süresi tespit edildi',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 saat önce
    importance: 'medium'
  }
];

// Zaman formatlayıcı fonksiyon
const formatTime = (date: Date) => {
  // Bugünün tarihi
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Bugün içinse saat, dün içinse "Dün" yazsın
  if (date.getDate() === today.getDate() && 
      date.getMonth() === today.getMonth() && 
      date.getFullYear() === today.getFullYear()) {
    return `Bugün ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  } else if (date.getDate() === yesterday.getDate() && 
             date.getMonth() === yesterday.getMonth() && 
             date.getFullYear() === yesterday.getFullYear()) {
    return `Dün ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  } else {
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
};

// Aktivite ikonunu belirleyen yardımcı fonksiyon
const getActivityIcon = (activityType: string) => {
  switch(activityType) {
    case 'movement':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'eating':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'health':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'location':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'rest':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

const ActivityTimelinePanel: React.FC = () => {
  return (
    <Panel 
      title="Aktivite Zaman Çizelgesi"
      linkTo="/activities"
      colorType="purple"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
    >
      <div className="activity-timeline">
        {activities.map(activity => (
          <div key={activity.id} className={`timeline-item importance-${activity.importance}`}>
            <div className={`timeline-icon ${activity.activityType}`}>
              {getActivityIcon(activity.activityType)}
            </div>
            <div className="timeline-content">
              <div className="timeline-title">
                <strong>{activity.animalName}</strong> ({activity.animalId}) - {activity.description}
              </div>
              <div className="timeline-time">{formatTime(activity.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};

export default ActivityTimelinePanel; 