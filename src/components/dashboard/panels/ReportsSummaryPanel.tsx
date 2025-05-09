import React from 'react';
import { Panel } from '../';
import '../../../styles/dashboard/panels/ReportsSummaryPanel.css';

interface Report {
  id: string;
  title: string;
  type: 'health' | 'reproduction' | 'activity' | 'herd';
  dateGenerated: string;
  status: 'new' | 'viewed';
}

interface ReportsSummaryPanelProps {
  recentReports: Report[];
}

export const ReportsSummaryPanel: React.FC<ReportsSummaryPanelProps> = ({ recentReports }) => {
  // Rapor türlerine göre ikonlar
  const getReportIcon = (type: Report['type']) => {
    switch (type) {
      case 'health':
        return '🩺';
      case 'reproduction':
        return '🐄';
      case 'activity':
        return '📊';
      case 'herd':
        return '🌾';
      default:
        return '📄';
    }
  };

  return (
    <Panel
      title="Raporlar Özeti"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      }
      actionText="Tüm Raporları Gör"
      actionLink="/reports"
    >
      <div className="reports-summary-container">
        {recentReports && recentReports.length > 0 ? (
          <div className="reports-list">
            {recentReports.map((report) => (
              <div key={report.id} className={`report-item ${report.status === 'new' ? 'new-report' : ''}`}>
                <div className="report-icon">{getReportIcon(report.type)}</div>
                <div className="report-details">
                  <div className="report-title">{report.title}</div>
                  <div className="report-date">{report.dateGenerated}</div>
                </div>
                {report.status === 'new' && <div className="new-badge">Yeni</div>}
                <div className="report-action">
                  <a href={`/reports/${report.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-reports">
            <p>Henüz oluşturulmuş rapor bulunmuyor.</p>
          </div>
        )}
      </div>
    </Panel>
  );
};

export default ReportsSummaryPanel; 