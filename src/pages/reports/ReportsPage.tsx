import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useDashboardReports from '../../hooks/useDashboardReports';
import type { ReportType, Report } from '../../types/report';
import HealthReport from '../../components/reports/HealthReport';
import ActivityReport from '../../components/reports/ActivityReport';
import ReproductionReport from '../../components/reports/ReproductionReport';
import DashboardSummary from '../../components/reports/DashboardSummary';
import SearchAndFilters from '../../components/reports/SearchAndFilters';
import ReportGenerator from '../../components/reports/ReportGenerator';
import ReportList from '../../components/reports/ReportList';
import ReportDetail from '../../components/reports/ReportDetail';
import { REPORT_TYPES, ANIMALS } from '../../constants/reportConstants';
import './ReportsPage.css';

const ReportsPage: React.FC = () => {
  const { reportId, reportType } = useParams<{ reportId?: string; reportType?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    recentReports,
    selectedReport,
    loading,
    loadingDetail,
    error,
    filterOptions,
    sortOptions,
    fetchReports,
    updateFilters,
    updateSort,
    fetchReportDetail,
    createReport,
    updateReportStatus
  } = useDashboardReports();
  
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('health');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [enhancedReports, setEnhancedReports] = useState<Report[]>([]);
  const [viewMode, setViewMode] = useState<'generate' | 'saved'>('saved');

  // Ek rapor verisi oluşturmak için kullanılan fonksiyon
  const generateAdditionalReports = useCallback(() => {
    // Raporlar için başlık şablonları
    const titleTemplates: Record<ReportType, string[]> = {
      health: [
        'Aylık Sağlık Taraması Raporu',
        'Aşı Takip Raporu',
        'Sürü Sağlığı Durumu',
        'Veteriner Kontrol Raporu',
        'Hastalık Analiz Raporu'
      ],
      reproduction: [
        'Doğum Performansı Raporu',
        'Üreme Verimliliği Analizi',
        'Kızgınlık Döngüsü Takibi',
        'Gebelik Durumu Raporu',
        'Yavru Gelişim Takibi'
      ],
      activity: [
        'Günlük Adım Analizi',
        'Sürü Hareketlilik Raporu',
        'Beslenme Davranışı Takibi',
        'Dinlenme Süresi Analizi',
        'Otlak Kullanım Raporu'
      ],
      herd: [
        'Sürü Demografik Raporu',
        'Grup Dinamikleri Analizi',
        'Sürü Yönetimi Ölçümleri',
        'Sürü Sosyal Yapı Değerlendirmesi',
        'Mera Kullanım Optimizasyonu'
      ]
    };
    
    const generateRandomDate = (start: Date, end: Date) => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };
    
    const formatDate = (date: Date) => {
      return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth()+1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };
    
    // Son 3 ay içinde tarihler oluştur
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);
    
    // Her rapor tipi için 5'er tane olmak üzere 20 rapor oluştur
    const reportTypes: ReportType[] = ['health', 'reproduction', 'activity', 'herd'];
    const newReports: Report[] = [];
    
    for (let i = 0; i < 20; i++) {
      const type = reportTypes[i % 4];
      const titles = titleTemplates[type];
      const title = titles[Math.floor(Math.random() * titles.length)];
      const date = generateRandomDate(startDate, endDate);
      const status = Math.random() > 0.7 ? 'new' : 'viewed' as const;
      
      newReports.push({
        id: `custom-${i + 1}`,
        title,
        type,
        dateGenerated: formatDate(date),
        status
      });
    }
    
    return newReports;
  }, []);

  // Raporları zenginleştir
  useEffect(() => {
    if (recentReports && recentReports.length > 0) {
      const additionalReports = generateAdditionalReports();
      setEnhancedReports([...recentReports, ...additionalReports]);
    }
  }, [recentReports, generateAdditionalReports]);

  // URL'den rapor tipini belirle
  useEffect(() => {
    if (reportType) {
      if (['health', 'activity', 'reproduction', 'herd'].includes(reportType)) {
        setSelectedReportType(reportType as ReportType);
      } else {
        navigate('/reports/health', { replace: true });
      }
    } else {
      navigate('/reports/health', { replace: true });
    }
  }, [reportType, navigate]);

  // Rapor detayını göster
  useEffect(() => {
    if (reportId) {
      fetchReportDetail(reportId)
        .then(report => {
          if (report.status === 'new') {
            updateReportStatus(reportId, 'viewed');
          }
          setReportGenerated(true);
        })
        .catch(error => {
          console.error('Rapor detayı yüklenemedi:', error);
          navigate('/reports');
        });
    }
  }, [reportId, fetchReportDetail, navigate, updateReportStatus]);

  // Filtre değişikliklerini takip et
  useEffect(() => {
    const statusFilter = filterOptions.status === 'all' ? undefined : filterOptions.status;
    updateFilters({
      type: selectedReportType,
      status: statusFilter
    });
  }, [selectedReportType, updateFilters, filterOptions.status]);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const parameters = {
        dateRange: {
          from: dateRange.startDate,
          to: dateRange.endDate
        },
        animalId: selectedAnimal || undefined
      };
      await createReport(selectedReportType, parameters);
      setIsGenerating(false);
      setReportGenerated(true);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Rapor oluşturma hatası:', error);
      setIsGenerating(false);
    }
  };

  const handleRefreshData = () => {
    fetchReports();
    setLastUpdate(new Date());
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'date-desc') {
      updateSort('dateGenerated', 'desc');
    } else if (value === 'date-asc') {
      updateSort('dateGenerated', 'asc');
    } else if (value === 'title-asc') {
      updateSort('title', 'asc');
    } else if (value === 'title-desc') {
      updateSort('title', 'desc');
    }
  };

  const renderReportComponent = () => {
    const formattedDateRange = {
      from: dateRange.startDate,
      to: dateRange.endDate
    };

    switch (selectedReportType) {
      case 'health':
        return <HealthReport dateRange={formattedDateRange} animalId={selectedAnimal} />;
      case 'activity':
        return <ActivityReport dateRange={formattedDateRange} animalId={selectedAnimal} />;
      case 'reproduction':
        return <ReproductionReport dateRange={formattedDateRange} animalId={selectedAnimal} />;
      case 'herd':
        return <div className="text-center py-8">Sürü Dinamikleri raporu henüz uygulanmadı.</div>;
      default:
        return <HealthReport dateRange={formattedDateRange} animalId={selectedAnimal} />;
    }
  };

  // Filtrelenmiş ve aranmış raporlar
  const filteredReports = useMemo(() => {
    if (!enhancedReports || enhancedReports.length === 0) {
      return [];
    }

    return enhancedReports.filter(report => {
      // Arama kriterine göre filtreleme
      const matchesSearch = searchTerm === '' || 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        report.dateGenerated.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtre kriterlerine göre filtreleme
      // Hiçbir filtre seçilmemişse bütün raporları göster
      if (activeFilters.length === 0) {
        return matchesSearch;
      }
      
      // Rapor tipine göre filtreleme
      const typeFilters = ['health', 'reproduction', 'activity', 'herd'];
      const hasTypeFilter = activeFilters.some(filter => typeFilters.includes(filter));
      const matchesTypeFilter = hasTypeFilter ? 
        activeFilters.includes(report.type) : true;
      
      // Durum filtresine göre filtreleme
      const statusFilters = ['new', 'viewed'];
      const hasStatusFilter = activeFilters.some(filter => statusFilters.includes(filter));
      const matchesStatusFilter = hasStatusFilter ? 
        (activeFilters.includes('new') && report.status === 'new') || 
        (activeFilters.includes('viewed') && report.status === 'viewed') : true;
      
      return matchesSearch && matchesTypeFilter && matchesStatusFilter;
    });
  }, [enhancedReports, searchTerm, activeFilters]);

  const toggleFilter = (filter: string): void => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    setActiveFilters(newFilters);
  };

  const generateCustomReportDetail = (report: any) => {
    return {
      ...report,
      content: `<h2>${report.title}</h2><p>Rapor detayları yükleniyor...</p>`,
      dateRange: {
        from: new Date().toLocaleDateString('tr-TR'),
        to: new Date().toLocaleDateString('tr-TR')
      },
      relatedAnimals: []
    };
  };

  const handleShowReportDetail = (id: string) => {
    if (id.startsWith('custom-')) {
      const report = enhancedReports.find(r => r.id === id);
      if (report) {
        const customDetail = generateCustomReportDetail(report);
        setTimeout(() => {
          updateReportStatus(id, 'viewed');
          fetchReportDetail(id).catch(() => {});
          setShowDetailModal(true);
        }, 500);
        return;
      }
    }

    fetchReportDetail(id)
      .then(report => {
        if (report.status === 'new') {
          updateReportStatus(id, 'viewed');
        }
        setShowDetailModal(true);
      })
      .catch(error => {
        console.error('Rapor detayı yüklenemedi:', error);
      });
  };

  const handleShareReport = (e: React.MouseEvent, reportId: string) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: 'Rapor Paylaş',
        text: 'Bu raporu kontrol et',
        url: `${window.location.origin}/reports/${reportId}`
      }).catch(err => console.error('Paylaşım hatası:', err));
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/reports/${reportId}`)
        .then(() => {
          alert('Rapor bağlantısı panoya kopyalandı!');
        })
        .catch(err => {
          console.error('Bağlantı kopyalama hatası:', err);
        });
    }
  };

  if (loading && !isGenerating) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Bir hata oluştu</h2>
        <p>{error.message}</p>
        <button onClick={fetchReports} className="retry-button">
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardSummary 
        reports={enhancedReports}
        onRefresh={handleRefreshData}
        lastUpdate={lastUpdate}
      />

      <div className="panels-grid">
        <div className={viewMode === 'saved' ? "full-width-panel" : ""}>
          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeFilters={activeFilters}
            onFilterToggle={toggleFilter}
            onClearFilters={() => setActiveFilters([])}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortValue={sortOptions.field === 'dateGenerated' 
              ? (sortOptions.order === 'desc' ? 'date-desc' : 'date-asc')
              : (sortOptions.order === 'desc' ? 'title-desc' : 'title-asc')}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      <div className="panels-grid">
        {viewMode === 'saved' ? (
          <div className="full-width-panel">
            <div className="panel">
              <div className="panel-header blue-panel-header">
                <div className="panel-header-content">
                  <div className="panel-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="panel-title">Raporlar</h3>
                </div>
                
                <div className="panel-header-actions">
                  <button 
                    className="panel-header-button"
                    onClick={handleRefreshData}
                    title="Rapor listesini yenile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Yenile</span>
                  </button>
                  
                  <button 
                    className="panel-header-button"
                    onClick={() => setViewMode('generate')}
                    title="Yeni rapor oluştur"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Yeni Rapor</span>
                  </button>
                </div>
              </div>
              
              <div className="panel-body">
                {activeFilters.length > 0 && (
                  <div className="active-filters-summary">
                    <div className="active-filters-content">
                      <div className="filter-summary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="filter-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                        </svg>
                        <span className="filter-count">
                          {activeFilters.length} filtre:
                        </span>
                        
                        <div className="filter-tags">
                          {activeFilters.map(filter => (
                            <span 
                              key={filter}
                              className="filter-tag"
                            >
                              {filter === 'health' && 'Sağlık'}
                              {filter === 'reproduction' && 'Üreme'}
                              {filter === 'activity' && 'Aktivite'}
                              {filter === 'herd' && 'Sürü'}
                              {filter === 'new' && 'Yeni'}
                              {filter === 'viewed' && 'Görüntülenmiş'}
                              <button 
                                className="filter-tag-remove"
                                onClick={() => toggleFilter(filter)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                      <button 
                        className="clear-all-filters"
                        onClick={() => setActiveFilters([])}
                      >
                        Temizle
                      </button>
                    </div>
                  </div>
                )}
                
                {filteredReports.length === 0 && searchTerm ? (
                  <div className="no-results">
                    <div className="no-results-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="no-results-title">Sonuç Bulunamadı</h3>
                    <p className="no-results-message">"{searchTerm}" için arama sonucu bulunamadı. Lütfen filtrelerinizi değiştirin veya başka anahtar kelimelerle arayın.</p>
                    <button 
                      className="clear-all-button"
                      onClick={() => {setSearchTerm(''); setActiveFilters([]);}}
                    >
                      Tüm filtreleri temizle
                    </button>
                  </div>
                ) : (
                  <ReportList
                    reports={filteredReports}
                    onReportClick={handleShowReportDetail}
                    onShareReport={handleShareReport}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <ReportGenerator
              selectedReportType={selectedReportType}
              onReportTypeSelect={setSelectedReportType}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              selectedAnimal={selectedAnimal}
              onAnimalSelect={setSelectedAnimal}
              isGenerating={isGenerating}
              onGenerateReport={handleGenerateReport}
            />

            <div className="panel animate-panel">
              <div className="panel-header blue-panel-header">
                <div className="panel-header-content">
                  <div className="panel-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="panel-title">Rapor Önizleme</h3>
                </div>
              </div>
              <div className="panel-body">
                {dateRange.startDate && dateRange.endDate ? (
                  <div className="animate-fade-in">
                    {renderReportComponent()}
                  </div>
                ) : (
                  <div className="preview-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" className="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Rapor oluşturmak için tarih aralığı seçin</p>
                    <p className="placeholder-hint">Formu doldurduktan sonra "Rapor Oluştur" düğmesine tıklayın</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {selectedReport && showDetailModal && (
        <ReportDetail
          report={selectedReport}
          onClose={() => setShowDetailModal(false)}
          onShare={handleShareReport}
        />
      )}
    </div>
  );
};

export default ReportsPage;