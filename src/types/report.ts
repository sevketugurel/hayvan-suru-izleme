export type ReportType = 'health' | 'reproduction' | 'activity' | 'herd';
export type ReportStatus = 'new' | 'viewed';

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  dateGenerated: string;
  status: ReportStatus;
}

export interface ReportDetail extends Report {
  content: string; // JSON veya HTML/String formatında rapor içeriği
  generatedBy: string; // Raporu oluşturan kullanıcı bilgisi
  dateRange?: {
    from: string;
    to: string;
  }; // Rapor hangi tarih aralığını kapsıyor
  parameters?: Record<string, any>; // Raporu oluşturmak için kullanılan parametreler
  relatedAnimals?: string[]; // Raporla ilgili hayvan ID'leri
} 