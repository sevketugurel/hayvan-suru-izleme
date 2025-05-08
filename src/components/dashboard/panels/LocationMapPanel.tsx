import React, { useState } from 'react';
import { Panel } from '../';

const regions = [
  { id: 'all', name: 'Tüm Bölgeler' },
  { id: 'north', name: 'Kuzey Mera' },
  { id: 'south', name: 'Güney Mera' },
  { id: 'east', name: 'Doğu Mera' }
];

const LocationMapPanel: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };
  
  const regionSelector = (
    <select 
      className="filter-select"
      value={selectedRegion}
      onChange={handleRegionChange}
    >
      {regions.map(region => (
        <option key={region.id} value={region.id}>
          {region.name}
        </option>
      ))}
    </select>
  );
  
  return (
    <Panel 
      title="Konum Haritası"
      headerContent={<div>{regionSelector}</div>}
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      }
    >
      <div className="map-placeholder">
        <div className="map-info">
          <p>Harita görüntüsü burada olacak.</p>
          <p>Seçilen Bölge: {regions.find(r => r.id === selectedRegion)?.name}</p>
        </div>
      </div>
    </Panel>
  );
};

export default LocationMapPanel; 