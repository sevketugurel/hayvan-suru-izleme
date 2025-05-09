import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDashboardReports from '../../hooks/useDashboardReports';
import type { ReportType } from '../../types';

// Rapor türleri
const REPORT_TYPES = [
  { id: 'health', name: 'Sağlık Raporu' },
  { id: 'reproduction', name: 'Üreme Performansı Raporu' },
  { id: 'activity', name: 'Aktivite ve Davranış Raporu' },
  { id: 'herd', name: 'Sürü Dinamikleri Raporu' }
];

// Örnek hayvan listesi (gerçek uygulamada API'den gelecek)
const ANIMALS = [
  { id: 'A001', name: 'Pamuk', tag: '#A001' },
  { id: 'B023', name: 'Duman', tag: '#B023' },
  { id: 'C045', name: 'Benekli', tag: '#C045' },
  { id: 'D007', name: 'Sarı', tag: '#D007' },
  { id: 'E018', name: 'Kara', tag: '#E018' }
];

const ReportsPage: React.FC = () => {
  const { reportId } = useParams();
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
  
  // Belirli bir rapor detayını göstermek için
  useEffect(() => {
    if (reportId) {
      fetchReportDetail(reportId)
        .then(report => {
          // Rapor durumunu "görüntülendi" olarak güncelle
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

  // Kaydedilmiş raporlar ve filtreli rapor görünümü
  const [viewMode, setViewMode] = useState<'generate' | 'saved'>('saved');
  
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Rapor oluşturma parametreleri
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
    } catch (error) {
      console.error('Rapor oluşturma hatası:', error);
      setIsGenerating(false);
    }
  };

  // Tablo başlıklarını rapor tipine göre oluştur
  const getTableHeaders = () => {
    switch (selectedReportType) {
      case 'health':
        return ['Hayvan ID', 'İsim', 'Vücut Sıcaklığı', 'Nabız', 'Stres Seviyesi', 'Son Muayene'];
      case 'reproduction':
        return ['Hayvan ID', 'İsim', 'Kızgınlık Durumu', 'Son Kızgınlık', 'Gebelik Durumu', 'Doğum Sayısı'];
      case 'activity':
        return ['Hayvan ID', 'İsim', 'Günlük Adım', 'Dinlenme Süresi', 'Yem Tüketimi', 'Aktivite Skoru'];
      case 'herd':
        return ['Hayvan ID', 'İsim', 'Grup', 'Sosyal Skor', 'Liderlik', 'Konum'];
      default:
        return ['Hayvan ID', 'İsim', 'Veri 1', 'Veri 2', 'Veri 3', 'Veri 4'];
    }
  };

  // Sıralama işlevleri
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

  // Filtre işlevleri
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'all' || value === 'new' || value === 'viewed') {
      updateFilters({ status: value });
    } else if (value === 'health' || value === 'reproduction' || value === 'activity' || value === 'herd') {
      setSelectedReportType(value as ReportType);
    }
  };

  if (loading && !isGenerating) {
    return (
      <div className="reports-container max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Raporlar</h1>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reports-container max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Raporlar</h1>
          <p className="text-red-600">Bir hata oluştu: {error.message}</p>
        </div>
        <button 
          onClick={() => fetchReports()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="reports-container max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Raporlar</h1>
        <p className="text-gray-600">SürüGözü çiftlik verilerinizi analiz edin ve özel raporlar oluşturun</p>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 font-medium text-sm ${
            viewMode === 'saved' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setViewMode('saved')}
        >
          Kaydedilmiş Raporlar ({recentReports.length})
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm ${
            viewMode === 'generate' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setViewMode('generate')}
        >
          Yeni Rapor Oluştur
        </button>
      </div>
      
      {viewMode === 'generate' ? (
        /* Report Generator Card */
        <div className="bg-white rounded-xl shadow mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-lg font-semibold text-white">Rapor Oluşturucu</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Report Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rapor Türü</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none border-gray-300 rounded-lg shadow-sm py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedReportType}
                    onChange={(e) => setSelectedReportType(e.target.value as ReportType)}
                  >
                    {REPORT_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Date Range Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tarih Aralığı</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      className="border-gray-300 rounded-lg shadow-sm pl-10 py-2 focus:ring-blue-500 focus:border-blue-500 block w-full"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      className="border-gray-300 rounded-lg shadow-sm pl-10 py-2 focus:ring-blue-500 focus:border-blue-500 block w-full"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              
              {/* Animal Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hayvan</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none border-gray-300 rounded-lg shadow-sm py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedAnimal}
                    onChange={(e) => setSelectedAnimal(e.target.value)}
                  >
                    <option value="">Tüm Hayvanlar</option>
                    {ANIMALS.map(animal => (
                      <option key={animal.id} value={animal.id}>{animal.name} {animal.tag}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <button
                className={`px-6 py-3 rounded-lg font-medium text-white flex items-center ${
                  isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={handleGenerateReport}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Rapor Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Raporu Oluştur
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Saved Reports List */
        <div className="bg-white rounded-xl shadow mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-lg font-semibold text-white">Kaydedilmiş Raporlar</h2>
              </div>
              <div className="flex space-x-4">
                <select
                  className="bg-white text-blue-700 text-sm rounded-md border-0 py-1 px-3"
                  onChange={handleFilterChange}
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="new">Yeni</option>
                  <option value="viewed">Görüntülendi</option>
                </select>
                <select
                  className="bg-white text-blue-700 text-sm rounded-md border-0 py-1 px-3"
                  onChange={handleFilterChange}
                >
                  <option value="all">Tüm Tipler</option>
                  {REPORT_TYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
                <select
                  className="bg-white text-blue-700 text-sm rounded-md border-0 py-1 px-3"
                  onChange={handleSortChange}
                >
                  <option value="date-desc">Tarih (Yeni-Eski)</option>
                  <option value="date-asc">Tarih (Eski-Yeni)</option>
                  <option value="title-asc">Başlık (A-Z)</option>
                  <option value="title-desc">Başlık (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            {recentReports.length === 0 ? (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-500 mb-2">Henüz kaydedilmiş rapor bulunmuyor.</p>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => setViewMode('generate')}
                >
                  Yeni Rapor Oluştur
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {recentReports.map(report => (
                  <div 
                    key={report.id}
                    className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between ${
                      report.status === 'new' ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' : 'border-gray-200'
                    }`}
                    onClick={() => navigate(`/reports/${report.id}`)}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        report.type === 'health' ? 'bg-green-100 text-green-700' :
                        report.type === 'reproduction' ? 'bg-purple-100 text-purple-700' :
                        report.type === 'activity' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {report.type === 'health' ? '🩺' :
                         report.type === 'reproduction' ? '🐄' :
                         report.type === 'activity' ? '📊' : '🌾'}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{report.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{report.dateGenerated}</span>
                          {report.status === 'new' && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">Yeni</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Report Results */}
      {reportGenerated && selectedReport && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h2 className="text-lg font-semibold text-white">
                {selectedReport.title}
              </h2>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-white text-green-700 rounded-md hover:bg-green-50 flex items-center shadow-sm transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDF
              </button>
              <button className="px-3 py-1 bg-white text-green-700 rounded-md hover:bg-green-50 flex items-center shadow-sm transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Excel
              </button>
              <button className="px-3 py-1 bg-white text-green-700 rounded-md hover:bg-green-50 flex items-center shadow-sm transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Yazdır
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {/* Report summary section */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Rapor Özeti</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Rapor Türü</p>
                  <p className="font-medium">
                    {selectedReport.type === 'health' ? 'Sağlık Raporu' :
                     selectedReport.type === 'reproduction' ? 'Üreme Performansı Raporu' :
                     selectedReport.type === 'activity' ? 'Aktivite ve Davranış Raporu' :
                     'Sürü Dinamikleri Raporu'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tarih Aralığı</p>
                  <p className="font-medium">
                    {selectedReport.dateRange ? 
                      `${selectedReport.dateRange.from} - ${selectedReport.dateRange.to}` : 
                      '(Belirtilmedi)'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">İlgili Hayvanlar</p>
                  <p className="font-medium">
                    {selectedReport.relatedAnimals ? 
                      selectedReport.relatedAnimals.length : 
                      'Tüm Hayvanlar'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Oluşturma Tarihi</p>
                  <p className="font-medium">{selectedReport.dateGenerated}</p>
                </div>
              </div>
            </div>
            
            {/* Report content */}
            <div 
              className="bg-white border border-gray-200 rounded-xl mb-6 overflow-hidden shadow-sm p-4"
              dangerouslySetInnerHTML={{ __html: selectedReport.content }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage; 
