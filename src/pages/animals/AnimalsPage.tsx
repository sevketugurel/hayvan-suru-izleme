import React, { useEffect, useState } from 'react';
import { useAnimalStore } from '../../store';
import AnimalCardGrid from './components/AnimalCardGrid';
import AnimalFilters from './components/AnimalFilters';
import { Link } from 'react-router-dom';
import './AnimalsPage.css';

const AnimalsPage: React.FC = () => {
  const { animals, loading, error, fetchAnimals } = useAnimalStore();
  const [filteredAnimals, setFilteredAnimals] = useState(animals);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecies, setFilterSpecies] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  useEffect(() => {
    let result = animals;

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(animal => 
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.tagNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply species filter
    if (filterSpecies) {
      result = result.filter(animal => animal.species === filterSpecies);
    }

    // Apply status filter
    if (filterStatus) {
      result = result.filter(animal => animal.status === filterStatus);
    }

    setFilteredAnimals(result);
  }, [animals, searchTerm, filterSpecies, filterStatus]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'species') {
      setFilterSpecies(value);
    } else if (key === 'status') {
      setFilterStatus(value);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterSpecies('');
    setFilterStatus('');
  };

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="animals-page">
      <div className="animals-header">
        <h1>Hayvan Listesi</h1>
        <Link to="/animals/new" className="add-animal-button">
          Yeni Hayvan Ekle
        </Link>
      </div>

      <AnimalFilters 
        searchTerm={searchTerm}
        filterSpecies={filterSpecies}
        filterStatus={filterStatus}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      <AnimalCardGrid animals={filteredAnimals} />
    </div>
  );
};

export default AnimalsPage; 