import React, { useState } from 'react';
import { Panel } from '../';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Özel marker ikonları için
const animalIcons = {
  normal: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  warning: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  critical: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

// Map boundaries fitter
const MapBoundsFitter = ({ bounds, positions }) => {
  const map = useMap();
  
  React.useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(L.latLngBounds(positions));
    }
  }, [map, positions, bounds]);
  
  return null;
};

const regions = [
  { id: 'all', name: 'Tüm Bölgeler' },
  { id: 'north', name: 'Kuzey Mera', position: [39.95, 32.85], animals: 42 },
  { id: 'south', name: 'Güney Mera', position: [39.93, 32.86], animals: 38 },
  { id: 'east', name: 'Doğu Mera', position: [39.94, 32.88], animals: 31 }
];

const animalLocations = [
  { id: 'A1001', position: [39.953, 32.853], status: 'normal', name: 'Duman' },
  { id: 'A1035', position: [39.931, 32.863], status: 'warning', name: 'Pembe' },
  { id: 'A1042', position: [39.941, 32.882], status: 'critical', name: 'Sarıkız' },
  { id: 'A1072', position: [39.935, 32.872], status: 'normal', name: 'Benekli' },
  { id: 'A1088', position: [39.947, 32.857], status: 'normal', name: 'Karabaş' },
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

  const getCircleColor = (status: string) => {
    switch(status) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#10b981';
    }
  };

  const filteredLocations = selectedRegion === 'all' 
    ? animalLocations
    : animalLocations.filter((_, index) => {
        // Basit bir filtreleme örneği (gerçekte daha karmaşık olabilir)
        if (selectedRegion === 'north') return index % 3 === 0;
        if (selectedRegion === 'south') return index % 3 === 1;
        if (selectedRegion === 'east') return index % 3 === 2;
        return true;
      });
  
  const allPositions = [
    ...regions.filter(r => r.id !== 'all' && r.position).map(r => r.position),
    ...filteredLocations.map(a => a.position)
  ] as [number, number][];
  
  return (
    <Panel 
      title="Konum Haritası"
      headerContent={<div>{regionSelector}</div>}
      colorType="blue"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      }
    >
      <div className="map-container">
        <MapContainer 
          center={[39.94, 32.86]} 
          zoom={13} 
          style={{ height: '320px', width: '100%', borderRadius: '8px' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {regions.filter(r => r.id !== 'all').map(region => (
            region.position && (
              <Circle 
                key={region.id}
                center={region.position as [number, number]}
                pathOptions={{ 
                  fillColor: selectedRegion === region.id ? '#3b82f6' : '#93c5fd', 
                  fillOpacity: 0.15, 
                  color: selectedRegion === region.id ? '#2563eb' : '#60a5fa', 
                  weight: 1 
                }}
                radius={500}
              >
                <Popup>
                  <div className="region-popup">
                    <strong>{region.name}</strong>
                    <br />
                    <span>Hayvan Sayısı: {region.animals}</span>
                  </div>
                </Popup>
              </Circle>
            )
          ))}

          {filteredLocations.map(animal => (
            <Marker 
              key={animal.id} 
              position={animal.position as [number, number]}
              icon={animalIcons[animal.status]}
            >
              <Popup>
                <div className="animal-popup">
                  <strong>{animal.name || 'Hayvan'}</strong>
                  <div className="animal-id">{animal.id}</div>
                  <div className="animal-status" style={{ color: getCircleColor(animal.status) }}>
                    Durum: {animal.status === 'normal' ? 'Normal' : animal.status === 'warning' ? 'Uyarı' : 'Kritik'}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          
          <MapBoundsFitter bounds={selectedRegion} positions={allPositions} />
        </MapContainer>

        <div className="map-legend">
          <div className="legend-item">
            <span className="status-dot normal"></span> Normal
          </div>
          <div className="legend-item">
            <span className="status-dot warning"></span> Uyarı
          </div>
          <div className="legend-item">
            <span className="status-dot critical"></span> Kritik
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default LocationMapPanel; 