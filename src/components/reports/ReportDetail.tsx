import React from 'react';
import type { Report } from '../../types/report';
import { ANIMALS } from '../../constants/reportConstants';

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
  onShare: (e: React.MouseEvent, reportId: string) => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({
  report,
  onClose,
  onShare
}) => {
  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal" onClick={(e) => e.stopPropagation()}>
        <div className="report-modal-header">
          <h3 className="report-modal-title">{report.title}</h3>
          <button 
            className="report-modal-close"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="report-modal-body">
          <div className="report-meta">
            <div className="report-meta-item">
              <span className="report-meta-label">Oluşturulma Tarihi:</span>
              <span className="report-meta-value">{report.dateGenerated}</span>
            </div>
            {report.dateRange && (
              <div className="report-meta-item">
                <span className="report-meta-label">Tarih Aralığı:</span>
                <span className="report-meta-value">{report.dateRange.from} - {report.dateRange.to}</span>
              </div>
            )}
            {report.relatedAnimals && (
              <div className="report-meta-item">
                <span className="report-meta-label">İlgili Hayvanlar:</span>
                <span className="report-meta-value">
                  {Array.isArray(report.relatedAnimals) 
                    ? report.relatedAnimals.map(id => {
                        const animal = ANIMALS.find(a => a.id === id);
                        return animal ? animal.name : id;
                      }).join(', ')
                    : report.relatedAnimals
                  }
                </span>
              </div>
            )}
          </div>

          {/* Özet İstatistikler */}
          <div className="report-stats-grid">
            {report.type === 'health' && (
              <>
                <div className="stat-card green">
                  <div className="stat-value">{Math.floor(Math.random() * 10) + 90}%</div>
                  <div className="stat-label">Sağlıklı Hayvan</div>
                </div>
                <div className="stat-card blue">
                  <div className="stat-value">{Math.floor(Math.random() * 5) + 5}</div>
                  <div className="stat-label">Veteriner Kontrol</div>
                </div>
                <div className="stat-card purple">
                  <div className="stat-value">{(38 + Math.random()).toFixed(1)}°C</div>
                  <div className="stat-label">Ortalama Sıcaklık</div>
                </div>
                <div className="stat-card amber">
                  <div className="stat-value">{Math.floor(Math.random() * 3)}</div>
                  <div className="stat-label">Karantina</div>
                </div>
              </>
            )}

            {report.type === 'reproduction' && (
              <>
                <div className="stat-card green">
                  <div className="stat-value">{Math.floor(Math.random() * 20) + 70}%</div>
                  <div className="stat-label">Gebelik Oranı</div>
                </div>
                <div className="stat-card blue">
                  <div className="stat-value">{Math.floor(Math.random() * 5) + 3}</div>
                  <div className="stat-label">Doğum Sayısı</div>
                </div>
                <div className="stat-card purple">
                  <div className="stat-value">{Math.floor(Math.random() * 15) + 80}%</div>
                  <div className="stat-label">Kızgınlık Tespiti</div>
                </div>
                <div className="stat-card amber">
                  <div className="stat-value">{Math.floor(Math.random() * 30) + 50}%</div>
                  <div className="stat-label">İlk Tohumlama Başarısı</div>
                </div>
              </>
            )}

            {report.type === 'activity' && (
              <>
                <div className="stat-card green">
                  <div className="stat-value">{Math.floor(Math.random() * 1000) + 3000}</div>
                  <div className="stat-label">Ortalama Adım</div>
                </div>
                <div className="stat-card blue">
                  <div className="stat-value">{Math.floor(Math.random() * 3) + 10}s</div>
                  <div className="stat-label">Dinlenme Süresi</div>
                </div>
                <div className="stat-card purple">
                  <div className="stat-value">{Math.floor(Math.random() * 3) + 5}s</div>
                  <div className="stat-label">Beslenme Süresi</div>
                </div>
                <div className="stat-card amber">
                  <div className="stat-value">%{Math.random() > 0.5 ? '+' : '-'}{Math.floor(Math.random() * 15) + 5}</div>
                  <div className="stat-label">Aktivite Değişimi</div>
                </div>
              </>
            )}

            {report.type === 'herd' && (
              <>
                <div className="stat-card green">
                  <div className="stat-value">{Math.floor(Math.random() * 50) + 80}</div>
                  <div className="stat-label">Toplam Hayvan</div>
                </div>
                <div className="stat-card blue">
                  <div className="stat-value">{Math.floor(Math.random() * 3) + 3}y</div>
                  <div className="stat-label">Ortalama Yaş</div>
                </div>
                <div className="stat-card purple">
                  <div className="stat-value">{Math.floor(Math.random() * 20) + 70}%</div>
                  <div className="stat-label">Dişi Oranı</div>
                </div>
                <div className="stat-card amber">
                  <div className="stat-value">{Math.floor(Math.random() * 5) + 10}/ha</div>
                  <div className="stat-label">Sürü Yoğunluğu</div>
                </div>
              </>
            )}
          </div>

          {/* Grafik Simülasyonu */}
          <div className="report-chart">
            <div className="chart-header">
              <h3 className="chart-title">
                {report.type === 'health' && 'Sağlık Durumu Trendi'}
                {report.type === 'reproduction' && 'Üreme Performans Trendi'}
                {report.type === 'activity' && 'Aktivite Düzeyi Trendi'}
                {report.type === 'herd' && 'Sürü Büyüklüğü Trendi'}
              </h3>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color primary"></div>
                  <div className="legend-text">
                    {report.type === 'health' && 'Sağlıklı Hayvan %'}
                    {report.type === 'reproduction' && 'Gebelik Oranı'}
                    {report.type === 'activity' && 'Ortalama Adım'}
                    {report.type === 'herd' && 'Toplam Hayvan'}
                  </div>
                </div>
                <div className="legend-item">
                  <div className="legend-color secondary"></div>
                  <div className="legend-text">
                    {report.type === 'health' && 'Hasta Hayvan %'}
                    {report.type === 'reproduction' && 'Doğum Oranı'}
                    {report.type === 'activity' && 'Dinlenme Süresi'}
                    {report.type === 'herd' && 'Grup Uyumu'}
                  </div>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <div className="chart-simulation">
                <div className="chart-bars">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div className="chart-bar-group" key={index}>
                      <div 
                        className="chart-bar primary" 
                        style={{ 
                          height: `${Math.floor(Math.random() * 50) + 40}%` 
                        }}
                      ></div>
                      <div 
                        className="chart-bar secondary" 
                        style={{ 
                          height: `${Math.floor(Math.random() * 30) + 20}%` 
                        }}
                      ></div>
                      <div className="chart-label">{`H${index + 1}`}</div>
                    </div>
                  ))}
                </div>
                <div className="chart-base-line"></div>
              </div>
            </div>
          </div>
          
          <div 
            className="report-content" 
            dangerouslySetInnerHTML={{ __html: report.content || '' }}
          ></div>
        </div>
        <div className="report-modal-footer">
          <button className="report-action-button download">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            İndir
          </button>
          <button 
            className="report-action-button share"
            onClick={(e) => onShare(e, report.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Paylaş
          </button>
          <button 
            className="report-action-button close"
            onClick={onClose}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail; 