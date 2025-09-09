export interface TNews {
  news_data: string | null;
  location: string | null;
  title: string;
  category: string | null;
  news_date?: Date;
  description: string | null;
  startup_id: number | null;
  created_at?: Date;
  readonly id: number;
}
