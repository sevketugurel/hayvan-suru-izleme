import React from 'react';
import type { Report } from '../../types/report';

interface DashboardSummaryProps {
  reports: Report[];
  onRefresh: () => void;
  lastUpdate: Date;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  reports,
  onRefresh,
  lastUpdate
}) => {
  const formatLastUpdate = (date: Date) => {
    return `${date.toLocaleDateString('tr-TR')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const newReportsCount = reports.filter(r => r.status === 'new').length;

  return (
    <div className="dashboard-summary">
      <div className="summary-content">
        <div className="summary-icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="summary-text">
          <h2 className="text-lg font-semibold text-gray-800">Hayvan Raporları</h2>
          <p>
            Sistemde toplam <strong>{reports.length}</strong> rapor bulunuyor.
            {newReportsCount > 0 && 
              <span className="summary-info ml-2">
                <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                İncelenmemiş <strong>{newReportsCount}</strong> yeni rapor mevcut.
              </span>
            }
          </p>
        </div>
      </div>
      <div className="summary-actions">
        <div className="flex items-center gap-3">
          <div className="summary-stat flex flex-col items-center justify-center px-3 py-1 rounded-lg bg-gray-50 border border-gray-100">
            <div className="stat-value">{reports.length}</div>
            <div className="stat-label">Toplam Rapor</div>
          </div>
          <div className="summary-stat flex flex-col items-center justify-center px-3 py-1 rounded-lg bg-blue-50 border border-blue-100">
            <div className="stat-value text-blue-700">{newReportsCount}</div>
            <div className="stat-label text-blue-600">Yeni</div>
          </div>
        </div>
        <button 
          onClick={onRefresh} 
          className="refresh-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Verileri Güncelle
        </button>
        <div className="last-update">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatLastUpdate(lastUpdate)}
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary; 