import React from 'react';
import type { ReportType, DateRange } from '../../types/report';
import { ANIMALS } from '../../constants/reportConstants';
import ReportTypeSelector from './ReportTypeSelector';

interface ReportGeneratorProps {
  selectedReportType: ReportType;
  onReportTypeSelect: (type: ReportType) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  selectedAnimal: string;
  onAnimalSelect: (animalId: string) => void;
  isGenerating: boolean;
  onGenerateReport: () => void;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  selectedReportType,
  onReportTypeSelect,
  dateRange,
  onDateRangeChange,
  selectedAnimal,
  onAnimalSelect,
  isGenerating,
  onGenerateReport
}) => {
  return (
    <div className="panel animate-panel">
      <div className="panel-header green-panel-header">
        <div className="panel-header-content">
          <div className="panel-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="panel-title">Yeni Rapor Oluştur</h3>
        </div>
      </div>
      <div className="panel-body">
        <div className="form-group">
          <label className="form-label">Rapor Türü</label>
          <ReportTypeSelector 
            selectedType={selectedReportType}
            onTypeSelect={onReportTypeSelect}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Başlangıç Tarihi</label>
            <div className="form-input-with-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="date"
                className="form-input with-icon"
                value={dateRange.startDate}
                onChange={(e) => onDateRangeChange({...dateRange, startDate: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Bitiş Tarihi</label>
            <div className="form-input-with-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="date"
                className="form-input with-icon"
                value={dateRange.endDate}
                onChange={(e) => onDateRangeChange({...dateRange, endDate: e.target.value})}
                min={dateRange.startDate}
              />
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Hayvan (İsteğe Bağlı)</label>
          <div className="form-input-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <select
              className="form-select with-icon"
              value={selectedAnimal}
              onChange={(e) => onAnimalSelect(e.target.value)}
            >
              <option value="">Tüm Hayvanlar</option>
              {ANIMALS.map(animal => (
                <option key={animal.id} value={animal.id}>
                  {animal.name} ({animal.tag}) - {animal.breed}, {animal.gender}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-actions">
          <button
            className={`action-button ${isGenerating ? 'loading' : 'green'}`}
            onClick={onGenerateReport}
            disabled={isGenerating || !dateRange.startDate || !dateRange.endDate}
          >
            {isGenerating ? (
              <>
                <div className="loading-spinner-sm" />
                <span>Rapor Oluşturuluyor</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Rapor Oluştur</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator; 