import React from 'react';
import type { Report } from '../../types/report';

interface ReportListProps {
  reports: Report[];
  onReportClick: (reportId: string) => void;
  onShareReport: (e: React.MouseEvent, reportId: string) => void;
}

// Define types for report color scheme
interface ColorScheme {
  border: string;
  bg: string;
  text: string;
  icon: React.ReactNode;
}

// Color mapping for different report types
const reportTypeColors: Record<string, ColorScheme> = {
  health: {
    border: '#22c55e',
    bg: '#dcfce7',
    text: '#16a34a',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    )
  },
  reproduction: {
    border: '#a855f7',
    bg: '#f3e8ff',
    text: '#9333ea',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    )
  },
  activity: {
    border: '#f59e0b',
    bg: '#fef3c7',
    text: '#d97706',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11z" clipRule="evenodd" />
      </svg>
    )
  },
  default: {
    border: '#3b82f6',
    bg: '#dbeafe',
    text: '#2563eb',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
      </svg>
    )
  }
};

const ReportList: React.FC<ReportListProps> = ({
  reports,
  onReportClick,
  onShareReport
}) => {
  if (!reports || reports.length === 0) {
    return (
      <div className="no-reports">
        <div className="mb-4 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">Henüz Rapor Yok</h3>
        <p className="text-gray-500 max-w-sm">İzleme yapmaya başladığınızda burada raporlarınızı göreceksiniz.</p>
      </div>
    );
  }

  return (
    <div className="reports-list-container">
      <div className="reports-list">
        {reports.map((report) => {
          const colorScheme = reportTypeColors[report.type] || reportTypeColors.default;
          
          return (
            <div
              key={report.id}
              onClick={() => onReportClick(report.id)}
              className="report-item"
              style={{ borderLeftColor: colorScheme.border }}
            >
              <div className="report-item-content">
                <div
                  className="report-icon"
                  style={{
                    backgroundColor: colorScheme.bg,
                    color: colorScheme.text
                  }}
                >
                  {colorScheme.icon}
                </div>
                <div className="report-details">
                  <p className="report-title">
                    {report.title}
                  </p>
                  <p className="report-date">
                    <span className="report-date-indicator" />
                    {report.dateGenerated}
                  </p>
                </div>
              </div>

              <div className="report-actions">
                {report.status === 'new' && (
                  <span className="report-status-badge">
                    Yeni
                  </span>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); onShareReport(e, report.id); }}
                  className="report-action-button"
                  aria-label="Raporu paylaş"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="report-action-button"
                  aria-label="Raporu görüntüle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {reports.length > 10 && (
        <div className="reports-count">
          {reports.length} rapor gösteriliyor
        </div>
      )}
    </div>
  );
};

export default ReportList;
