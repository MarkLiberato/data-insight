export interface DatasetSummary {
  dataset_id: string;
  rows: number;
  columns: number;
  column_names: string[];
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'scatter';
  title: string;
  data: any;
  options?: any;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'trend' | 'anomaly' | 'correlation' | 'summary';
}

export interface UploadResponse {
  success: boolean;
  dataset_id: string;
  summary: DatasetSummary;
}
