import { useState, useEffect, useCallback } from 'react';
import type { Report, ReportDetail, ReportType } from '../types';

interface FilterOptions {
  type?: ReportType;
  dateFrom?: string;
  dateTo?: string;
  status?: 'new' | 'viewed' | 'all';
}

interface SortOptions {
  field: 'dateGenerated' | 'title' | 'type';
  order: 'asc' | 'desc';
}

type DashboardReportsState = {
  loading: boolean;
  recentReports: Report[];
  error: Error | null;
  selectedReport: ReportDetail | null;
  loadingDetail: boolean;
  filterOptions: FilterOptions;
  sortOptions: SortOptions;
};

// Mock veri servisi - gerçek API bağlantısı kurulana kadar
const fetchMockReports = (filter?: FilterOptions, sort?: SortOptions): Promise<Report[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Temel rapor verileri
      let reports: Report[] = [
        {
          id: '1',
          title: 'Haftalık Sağlık Raporu',
          type: 'health',
          dateGenerated: '08.07.2023 14:30',
          status: 'new'
        },
        {
          id: '2',
          title: 'Aylık Üreme Performansı Raporu',
          type: 'reproduction',
          dateGenerated: '01.07.2023 09:15',
          status: 'viewed'
        },
        {
          id: '3',
          title: 'Aktivite ve Davranış Raporu',
          type: 'activity',
          dateGenerated: '25.06.2023 16:45',
          status: 'viewed'
        },
        {
          id: '4',
          title: 'Sürü Dinamikleri Raporu',
          type: 'herd',
          dateGenerated: '15.06.2023 10:20',
          status: 'viewed'
        },
        {
          id: '5',
          title: 'Yem Tüketimi Analizi',
          type: 'health',
          dateGenerated: '10.07.2023 11:05',
          status: 'new'
        },
        {
          id: '6',
          title: 'Çiftlik Günlük Özet Raporu',
          type: 'herd',
          dateGenerated: '09.07.2023 18:00',
          status: 'viewed'
        }
      ];
      
      // Filtreleme işlevi
      if (filter) {
        if (filter.type) {
          reports = reports.filter(report => report.type === filter.type);
        }
        
        if (filter.status && filter.status !== 'all') {
          reports = reports.filter(report => report.status === filter.status);
        }
        
        if (filter.dateFrom) {
          const fromDate = new Date(filter.dateFrom);
          reports = reports.filter(report => new Date(report.dateGenerated) >= fromDate);
        }
        
        if (filter.dateTo) {
          const toDate = new Date(filter.dateTo);
          reports = reports.filter(report => new Date(report.dateGenerated) <= toDate);
        }
      }
      
      // Sıralama işlevi
      if (sort) {
        reports.sort((a, b) => {
          if (sort.field === 'dateGenerated') {
            const dateA = new Date(a.dateGenerated);
            const dateB = new Date(b.dateGenerated);
            return sort.order === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
          } else {
            const aValue = a[sort.field];
            const bValue = b[sort.field];
            if (sort.order === 'asc') {
              return aValue.localeCompare(bValue);
            } else {
              return bValue.localeCompare(aValue);
            }
          }
        });
      } else {
        // Varsayılan olarak en yeni raporlar üstte
        reports.sort((a, b) => new Date(b.dateGenerated).getTime() - new Date(a.dateGenerated).getTime());
      }
      
      resolve(reports);
    }, 800); // Simule edilmiş network gecikmesi
  });
};

// Mock rapor detayları alma servisi
const fetchMockReportDetail = (reportId: string): Promise<ReportDetail> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Temel rapor detaylarını hazırla
      const reportDetails: Record<string, ReportDetail> = {
        '1': {
          id: '1',
          title: 'Haftalık Sağlık Raporu',
          type: 'health',
          dateGenerated: '08.07.2023 14:30',
          status: 'new',
          content: `<h2>Haftalık Sağlık Özeti</h2>
          <p>Bu hafta çiftlikteki hayvanların genel sağlık durumu <strong>iyi</strong> olarak değerlendirilmiştir.</p>
          <ul>
            <li>Sağlıklı hayvan sayısı: 87 (%92)</li>
            <li>Risk altındaki hayvan sayısı: 7 (%8)</li>
            <li>Tedavi edilen hayvan sayısı: 3</li>
          </ul>
          <h3>Öne çıkan durumlar</h3>
          <p>B-12 vitamini eksikliği belirtileri gösteren hayvanlar için ek vitamin takviyesi önerilmiştir.</p>`,
          generatedBy: 'Sistem',
          dateRange: {
            from: '01.07.2023',
            to: '07.07.2023'
          },
          relatedAnimals: ['A001', 'B023', 'C045']
        },
        '2': {
          id: '2',
          title: 'Aylık Üreme Performansı Raporu',
          type: 'reproduction',
          dateGenerated: '01.07.2023 09:15',
          status: 'viewed',
          content: `<h2>Haziran Ayı Üreme Performansı</h2>
          <p>Haziran ayı boyunca üreme istatistikleri aşağıdaki gibidir:</p>
          <ul>
            <li>Kızgınlık tespiti: 12 hayvan</li>
            <li>Başarılı tohumlama: 8 hayvan</li>
            <li>Doğum yapan hayvan sayısı: 5</li>
            <li>Toplam doğan yavru: 5</li>
          </ul>
          <p>Genel olarak üreme performansı geçen aya göre %8 artış göstermiştir.</p>`,
          generatedBy: 'Sistem',
          dateRange: {
            from: '01.06.2023',
            to: '30.06.2023'
          }
        },
        '3': {
          id: '3',
          title: 'Aktivite ve Davranış Raporu',
          type: 'activity',
          dateGenerated: '25.06.2023 16:45',
          status: 'viewed',
          content: `<h2>Aktivite Analizi</h2>
          <p>Son 7 gün içindeki hayvan aktivite analizi:</p>
          <ul>
            <li>Ortalama günlük adım sayısı: 3245</li>
            <li>Dinlenme süresi: günlük ortalama 12.3 saat</li>
            <li>Yem tüketim süresi: günlük ortalama 5.1 saat</li>
          </ul>
          <p>Bazı hayvanlarda (özellikle A023, B017) dinlenme süresinde azalma gözlemlenmiştir. Kontrol edilmesi önerilir.</p>`,
          generatedBy: 'Sistem',
          dateRange: {
            from: '18.06.2023',
            to: '24.06.2023'
          },
          relatedAnimals: ['A023', 'B017']
        },
        '4': {
          id: '4',
          title: 'Sürü Dinamikleri Raporu',
          type: 'herd',
          dateGenerated: '15.06.2023 10:20',
          status: 'viewed',
          content: `<h2>Sürü Sosyal Davranış Analizi</h2>
          <p>Sürü içindeki sosyal etkileşim analizi:</p>
          <ul>
            <li>Lider konumundaki hayvanlar: A001, B054</li>
            <li>Dışlanma eğilimi gösteren hayvanlar: C023</li>
            <li>Sürü uyum skoru: 87/100</li>
          </ul>
          <p>C023 numaralı hayvanın sürüden uzaklaşma eğilimi gösterdiği saptanmıştır. Gözlem altında tutulması önerilir.</p>`,
          generatedBy: 'Sistem',
          dateRange: {
            from: '01.06.2023',
            to: '15.06.2023'
          },
          relatedAnimals: ['A001', 'B054', 'C023']
        },
        '5': {
          id: '5',
          title: 'Yem Tüketimi Analizi',
          type: 'health',
          dateGenerated: '10.07.2023 11:05',
          status: 'new',
          content: `<h2>Haftalık Yem Tüketimi</h2>
          <p>Son hafta içindeki yem tüketim analizi:</p>
          <ul>
            <li>Toplam tüketilen yem: 2750 kg</li>
            <li>Hayvan başına ortalama: 27.5 kg</li>
            <li>Yem verimliliği: 1.8 (süt/yem oranı)</li>
          </ul>
          <p>D007 numaralı hayvanın yem tüketiminde %15 düşüş tespit edilmiştir. Sağlık kontrolü önerilir.</p>`,
          generatedBy: 'Sistem',
          dateRange: {
            from: '03.07.2023',
            to: '09.07.2023'
          },
          relatedAnimals: ['D007']
        },
        '6': {
          id: '6',
          title: 'Çiftlik Günlük Özet Raporu',
          type: 'herd',
          dateGenerated: '09.07.2023 18:00',
          status: 'viewed',
          content: `<h2>Günlük Çiftlik Özeti</h2>
          <p>9 Temmuz 2023 tarihli çiftlik özeti:</p>
          <ul>
            <li>Süt üretimi: 1850 lt</li>
            <li>Aktif uyarı sayısı: 3</li>
            <li>Tedavi edilen hayvan: 1</li>
            <li>Kızgınlık tespit edilen hayvan: 2</li>
          </ul>
          <p>E018 numaralı hayvan için veteriner kontrolü planlanmıştır.</p>`,
          generatedBy: 'Sistem',
          dateRange: {
            from: '09.07.2023',
            to: '09.07.2023'
          },
          relatedAnimals: ['E018']
        }
      };

      if (reportDetails[reportId]) {
        resolve(reportDetails[reportId]);
      } else {
        reject(new Error('Rapor bulunamadı'));
      }
    }, 1000); // Simule edilmiş network gecikmesi
  });
};

// Mock rapor oluşturma servisi
const createMockReport = (reportType: ReportType, parameters: Record<string, any>): Promise<Report> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Yeni rapor oluşturma simülasyonu
      const now = new Date();
      const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth()+1).toString().padStart(2, '0')}.${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      // Parametre kullanımı için basit bir başlık oluşturma
      const title = parameters?.title || 
        `${reportType === 'health' ? 'Sağlık' : 
         reportType === 'reproduction' ? 'Üreme' : 
         reportType === 'activity' ? 'Aktivite' : 'Sürü'} Raporu`;
      
      const newReport: Report = {
        id: `new-${Date.now()}`,
        title: title,
        type: reportType,
        dateGenerated: formattedDate,
        status: 'new'
      };
      
      resolve(newReport);
    }, 1500); // Simule edilmiş network gecikmesi
  });
};

const useDashboardReports = () => {
  const [state, setState] = useState<DashboardReportsState>({
    loading: true,
    recentReports: [],
    error: null,
    selectedReport: null,
    loadingDetail: false,
    filterOptions: { status: 'all' },
    sortOptions: { field: 'dateGenerated', order: 'desc' }
  });

  // Rapor listesini çekmek için
  const fetchReports = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Gerçek uygulamada bu, bir API çağrısı olacaktır
      const reportsData = await fetchMockReports(
        state.filterOptions, 
        state.sortOptions
      );
      
      setState(prev => ({
        ...prev,
        loading: false,
        recentReports: reportsData,
        error: null
      }));
    } catch (error) {
      console.error('Rapor verisi yüklenirken hata:', error);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error : new Error('Rapor verileri yüklenirken bilinmeyen hata oluştu')
      }));
    }
  }, [state.filterOptions, state.sortOptions]);

  // Filtreleri güncellemek için
  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setState(prev => ({
      ...prev,
      filterOptions: { ...prev.filterOptions, ...newFilters }
    }));
  }, []);

  // Sıralama seçeneklerini güncellemek için
  const updateSort = useCallback((field: SortOptions['field'], order: SortOptions['order']) => {
    setState(prev => ({
      ...prev,
      sortOptions: { field, order }
    }));
  }, []);

  // Belirli bir raporun detaylarını çekmek için
  const fetchReportDetail = useCallback(async (reportId: string) => {
    setState(prev => ({ ...prev, loadingDetail: true }));
    
    try {
      const reportDetail = await fetchMockReportDetail(reportId);
      setState(prev => ({
        ...prev,
        selectedReport: reportDetail,
        loadingDetail: false
      }));
      return reportDetail;
    } catch (error) {
      console.error('Rapor detayı yüklenirken hata:', error);
      setState(prev => ({ 
        ...prev, 
        loadingDetail: false,
        error: error instanceof Error ? error : new Error('Rapor detayı yüklenirken bilinmeyen hata oluştu')
      }));
      throw error;
    }
  }, []);

  // Yeni rapor oluşturmak için
  const createReport = useCallback(async (reportType: ReportType, parameters: Record<string, any>) => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      // Gerçek API çağrısını simüle ediyoruz
      const newReport = await createMockReport(reportType, parameters);
      
      // Yeni raporu listeye ekle ve state'i güncelle
      setState(prev => ({
        ...prev,
        loading: false,
        recentReports: [newReport, ...prev.recentReports]
      }));
      
      return newReport;
    } catch (error) {
      console.error('Rapor oluşturulurken hata:', error);
      setState(prev => ({ 
        ...prev, 
        loading: false,
        error: error instanceof Error ? error : new Error('Rapor oluşturulurken bilinmeyen hata oluştu')
      }));
      throw error;
    }
  }, []);

  // Rapor durumunu güncellemek için (örn. new -> viewed)
  const updateReportStatus = useCallback(async (reportId: string, newStatus: 'new' | 'viewed') => {
    setState(prev => ({ 
      ...prev, 
      recentReports: prev.recentReports.map(report => 
        report.id === reportId ? { ...report, status: newStatus } : report
      ),
      selectedReport: prev.selectedReport?.id === reportId ? 
        { ...prev.selectedReport, status: newStatus } : prev.selectedReport
    }));
  }, []);

  // İlk yükleme esnasında verileri çek
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    ...state,
    fetchReports,
    updateFilters,
    updateSort,
    fetchReportDetail,
    createReport,
    updateReportStatus
  };
};

export default useDashboardReports; 