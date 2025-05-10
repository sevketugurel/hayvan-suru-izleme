import React from 'react';
import type { ReportType } from '../../types/report';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
  onClearFilters: () => void;
  viewMode: 'saved' | 'generate';
  onViewModeChange: (mode: 'saved' | 'generate') => void;
  sortValue: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface FilterConfig {
  icon?: string;
  title: string;
  bgColor: string;
  borderColor: string;
  activeColor: string;
}

type FilterType = 'health' | 'reproduction' | 'activity' | 'herd' | 'new' | 'viewed';

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  activeFilters,
  onFilterToggle,
  onClearFilters,
  viewMode,
  onViewModeChange,
  sortValue,
  onSortChange
}) => {
  // Filter icons and colors
  const filterConfig: Record<FilterType, FilterConfig> = {
    health: { icon: '🩺', title: 'Sağlık', bgColor: 'bg-pink-50', borderColor: 'border-pink-200', activeColor: 'bg-pink-100' },
    reproduction: { icon: '🐄', title: 'Üreme', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', activeColor: 'bg-purple-100' },
    activity: { icon: '📊', title: 'Aktivite', bgColor: 'bg-green-50', borderColor: 'border-green-200', activeColor: 'bg-green-100' },
    herd: { icon: '🌾', title: 'Sürü', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', activeColor: 'bg-yellow-100' },
    new: { title: 'Yeni', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', activeColor: 'bg-blue-100' },
    viewed: { title: 'Görüntülenen', bgColor: 'bg-gray-50', borderColor: 'border-gray-200', activeColor: 'bg-gray-100' }
  };

  const filterTypes: FilterType[] = ['health', 'reproduction', 'activity', 'herd', 'new', 'viewed'];

  return (
    <div className="panel">
      <div className="panel-header default-panel-header">
        <div className="panel-header-content">
          <div className="panel-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <h3 className="panel-title">Rapor Filtreleri</h3>
        </div>

        <div className="view-toggle">
          <button
            className={`view-toggle-button ${viewMode === 'saved' ? 'active' : ''}`}
            onClick={() => onViewModeChange('saved')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Kaydedilmiş
          </button>
          <button
            className={`view-toggle-button ${viewMode === 'generate' ? 'active' : ''}`}
            onClick={() => onViewModeChange('generate')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Yeni Rapor
          </button>
        </div>
      </div>

      <div className="panel-body">
        <div className="search-and-filters-content">
          {viewMode === 'saved' && (
            <div className="search-bar">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Raporlarda ara..." 
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="search-clear" 
                    onClick={() => onSearchChange('')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
          
          <div className="filter-controls">
            <select
              className="filter-select"
              value={sortValue}
              onChange={onSortChange}
            >
              <option value="date-desc">En Yeni</option>
              <option value="date-asc">En Eski</option>
              <option value="title-asc">İsim (A-Z)</option>
              <option value="title-desc">İsim (Z-A)</option>
            </select>
          </div>
        </div>

        {viewMode === 'saved' && (
          <div className="filter-chips">
            {filterTypes.map((filter) => {
              const config = filterConfig[filter];
              const isActive = activeFilters.includes(filter);
              
              return (
                <div 
                  key={filter}
                  className={`filter-chip ${isActive ? 'active' : ''}`}
                  onClick={() => onFilterToggle(filter)}
                >
                  {config.icon && <span className="chip-icon">{config.icon}</span>}
                  <span className="chip-text">{config.title}</span>
                </div>
              );
            })}
            
            {activeFilters.length > 0 && (
              <button 
                className="clear-filters"
                onClick={onClearFilters}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Temizle
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters; 