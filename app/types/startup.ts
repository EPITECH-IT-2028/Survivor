export type ProjectStatus = 'scale-up' | 'early-stage' | 'seed' | 'growth';
export type Needs = 'talent-acquisition' | 'strategic-partnerships' | 'funding' | 'mentorship';
export type Maturity = 'idea' | 'mvp' | 'product-market-fit' | 'prototype';
export type Sector = 'deeptech' | 'fintech' | 'saas' | 'logistics' | 'edtech' | 'healthtech';

export const projectStatusFilters = [
  { value: '-', label: '-' },
  { value: 'scale-up', label: 'Scale-up' },
  { value: 'early-stage', label: 'Early-stage' },
  { value: 'seed', label: 'Seed' },
  { value: 'growth', label: 'Growth' },
]
export const needsFilters = [
  { value: '-', label: '-' },
  { value: 'talent-acquisition', label: 'Talent acquisition' },
  { value: 'strategic-partnerships', label: 'Strategic partnerships' },
  { value: 'funding', label: 'Funding' },
  { value: 'mentorship', label: 'Mentorship' },
]

export const maturityFilters = [
  { value: '-', label: '-' },
  { value: 'idea', label: 'Idea' },
  { value: 'mvp', label: 'MVP' },
  { value: 'product-market-fit', label: 'Product-market-fit' },
  { value: 'prototype', label: 'Prototype' },
]

export const sectorFilters = [
  { value: '-', label: '-' },
  { value: 'deeptech', label: 'Deeptech' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'saas', label: 'SaaS' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'edtech', label: 'Edtech' },
  { value: 'healthtech', label: 'Healthtech' },
]

export interface TStartups {
  readonly id: number;
  name: string;
  legal_status: string | null;
  address: string | null;
  email: string;
  phone: string | null;
  sector: string | null;
  maturity: string | null;
  created_at: Date | string | null;
  website_url: string | null;
  social_media_url: string | null;
  project_status: string | null;
  needs: string | null;
  description: string | null;
  founder: number | null;
  news: number | null;
}
