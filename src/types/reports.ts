export type ReportType = 'health' | 'reproduction' | 'activity' | 'herd';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  dateGenerated: string;
  status: 'new' | 'viewed';
  content?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  relatedAnimals?: string[];
}

export interface ReportDetail extends Report {
  generatedBy: string;
  content: string;
  dateRange: {
    from: string;
    to: string;
  };
}

export interface Animal {
  id: string;
  name: string;
  tag: string;
  breed: string;
  birthDate: string;
  gender: string;
}

export interface FilterOptions {
  status: string;
  type?: ReportType;
}

export interface SortOptions {
  field: string;
  order: 'asc' | 'desc';
} 