export type CategoryNews = 'Funding' | 'Award' | 'Launch' | 'Partnership' | '-';

export interface TNews {
  readonly id: number;
  title: string;
  category: CategoryNews;
  startup_id: number;
  news_date?: Date;
  location?: string;
  description?: string;
  startup: string;
  image?: string;
}

export enum categoryId {
  'Funding' = 0,
  'Award' = 1,
  'Launch' = 2,
  'Partnership' = 3,
  '-' = 4,
};

export const categoryFilter = [
  { value: 'Funding', label: 'Funding'},
  { value: 'Award', label: 'Award'},
  { value: 'Launch', label: 'Launch'},
  { value: 'Partnership', label: 'Partnership'},
  { value: '-', label: '-'},
];
