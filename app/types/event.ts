export type TargetAudience = 'Startups' | 'Investors' | 'Developpers' | '-';
export type EventType = 'Workshop' | 'Pitch Session' | 'Conference' | '-';

export interface TEvent {
  name: string;
  dates: string | null;
  location: string | null;
  description: string | null;
  event_type: EventType;
  target_audience: TargetAudience;
  readonly id: number;
}


export enum targetAudienceId {
  'Startups' = 0,
  'Investors' = 1,
  'Developpers' = 2,
  '-' = 3,
}

export enum eventTypeId {
  'Workshop' = 0,
  'Pitch Session' = 1,
  'Conference' = 2,
  '-' = 3,
}

export const targetAudienceFilters = [
  { value: 'Startups', label: 'Startups' },
  { value: 'Investors', label: 'Investors' },
  { value: 'Developpers', label: 'Developpers' },
  { value: '-', label: '-' },
];


export const eventTypeFilters = [
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Pitch Session', label: 'Pitch Session' },
  { value: 'Conference', label: 'Conference' },
  { value: '-', label: '-' },
];
