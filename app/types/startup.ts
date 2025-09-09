export type ProjectStatus = 'scale-up' | 'early-stage' | 'seed' | 'growth';
export type Needs = 'talent-acquisition' | 'strategic-partnerships' | 'funding' | 'mentorship';
export type Maturity = 'idea' | 'mvp' | 'product-market-fit' | 'prototype';
export type Sector = 'deeptech' | 'fintech' | 'saas' | 'logistics' | 'edtech' | 'healthtech';

export const projectStatusFilters = [
  { value: '-', label: '-' },
  { value: 'Scale-up', label: 'Scale-up' },
  { value: 'Early Stage', label: 'Early Stage' },
  { value: 'Seed', label: 'Seed' },
  { value: 'Growth', label: 'Growth' },
]
export const needsFilters = [
  { value: '-', label: '-' },
  { value: 'Talent Acquisition', label: 'Talent acquisition' },
  { value: 'Strategic Partnerships', label: 'Strategic partnerships' },
  { value: 'Funding', label: 'Funding' },
  { value: 'Mentorship', label: 'Mentorship' },
]

export const maturityFilters = [
  { value: '-', label: '-' },
  { value: 'Idea', label: 'Idea' },
  { value: 'MVP', label: 'MVP' },
  { value: 'Product-Market Fit', label: 'Product-Market Fit' },
  { value: 'Prototype', label: 'Prototype' },
]

export const sectorFilters = [
  { value: '-', label: '-' },
  { value: 'DeepTech', label: 'DeepTech' },
  { value: 'Fintech', label: 'Fintech' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'Logistics', label: 'Logistics' },
  { value: 'EdTech', label: 'EdTech' },
  { value: 'HealthTech', label: 'HealthTech' },
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
