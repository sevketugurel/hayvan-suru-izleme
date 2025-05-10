import React from 'react';
import type { Animal } from '../../../mocks';
import AnimalCard from './AnimalCard';
import './AnimalCardGrid.css';

interface AnimalCardGridProps {
  animals: Animal[];
}

const AnimalCardGrid: React.FC<AnimalCardGridProps> = ({ animals }) => {
  if (animals.length === 0) {
    return <div className="no-animals">Hayvan bulunamadı.</div>;
  }

  return (
    <div className="animal-card-grid">
      {animals.map(animal => (
        <div key={animal.id} className="animal-card-grid-item">
          <AnimalCard animal={animal} />
        </div>
      ))}
    </div>
  );
};

export default AnimalCardGrid; 