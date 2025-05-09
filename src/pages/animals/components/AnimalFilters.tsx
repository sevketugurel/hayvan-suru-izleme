import React from 'react';
import './AnimalFilters.css';

interface AnimalFiltersProps {
  searchTerm: string;
  filterSpecies: string;
  filterStatus: string;
  onSearch: (term: string) => void;
  onFilterChange: (key: string, value: string) => void;
  onResetFilters: () => void;
}

const AnimalFilters: React.FC<AnimalFiltersProps> = ({
  searchTerm,
  filterSpecies,
  filterStatus,
  onSearch,
  onFilterChange,
  onResetFilters
}) => {
  return (
    <div className="animal-filters">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Hayvan adı veya küpe numarası ara..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="select-filters">
        <div className="filter-group">
          <label htmlFor="species-filter">Tür</label>
          <select
            id="species-filter"
            value={filterSpecies}
            onChange={(e) => onFilterChange('species', e.target.value)}
            className="filter-select"
          >
            <option value="">Tümü</option>
            <option value="Koyun">Koyun</option>
            <option value="İnek">İnek</option>
            <option value="Keçi">Keçi</option>
            <option value="At">At</option>
            <option value="Boğa">Boğa</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Durum</label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="">Tümü</option>
            <option value="active">Aktif</option>
            <option value="warning">Uyarı</option>
            <option value="inactive">İnaktif</option>
          </select>
        </div>

        <button
          onClick={onResetFilters}
          className="reset-button"
        >
          Filtreleri Sıfırla
        </button>
      </div>
    </div>
  );
};

export default AnimalFilters; 