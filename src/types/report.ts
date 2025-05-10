// Define the type of reports available
export type ReportType = 'health' | 'reproduction' | 'activity' | 'herd';

// Basic report info
export interface Report {
  id: string;
  title: string;
  type: ReportType;
  dateGenerated: string;
  status: 'new' | 'viewed';
}

// Detailed report data with content
export interface ReportDetail extends Report {
  content: string;
  generatedBy?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  relatedAnimals?: string[];
}

// Report parameters for creation/filtering
export interface ReportParameters {
  dateRange?: {
    from: string;
    to: string;
  };
  animalId?: string;
  type?: ReportType;
  status?: 'new' | 'viewed' | 'all';
} 