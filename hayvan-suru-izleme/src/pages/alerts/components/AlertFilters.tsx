import React from 'react';
import './AlertFilters.css';

interface AlertFiltersProps {
  searchTerm: string;
  filterType: string;
  filterSeverity: string;
  onSearch: (term: string) => void;
  onFilterChange: (key: string, value: string) => void;
  onResetFilters: () => void;
}

const AlertFilters: React.FC<AlertFiltersProps> = ({
  searchTerm,
  filterType,
  filterSeverity,
  onSearch,
  onFilterChange,
  onResetFilters
}) => {
  return (
    <div className="alert-filters">
      <div className="search-container">
        <input
          type="text"
          placeholder="Ara..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="typeFilter">Tümü:</label>
          <select
            id="typeFilter"
            value={filterType}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="filter-select"
          >
            <option value="">Tümü</option>
            <option value="battery">Pil</option>
            <option value="location">Konum</option>
            <option value="health">Sağlık</option>
            <option value="system">Sistem</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="severityFilter">Sırala:</label>
          <select
            id="severityFilter"
            value={filterSeverity}
            onChange={(e) => onFilterChange('severity', e.target.value)}
            className="filter-select"
          >
            <option value="">Tümü</option>
            <option value="high">Yüksek</option>
            <option value="medium">Orta</option>
            <option value="low">Düşük</option>
          </select>
        </div>

        <button 
          onClick={onResetFilters} 
          className="reset-filters-btn"
        >
          Filtreleri Sıfırla
        </button>
      </div>
    </div>
  );
};

export default AlertFilters; 