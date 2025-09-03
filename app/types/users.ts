export type UserRole = 'admin' | 'founder' | 'investor' | '-';

export enum userRoleId {
  'admin' = 0,
  'founder' = 1,
  'investor' = 2,
  '-' = 3,
}

export const userRoleFilters = [
  { value: 'admin', label: 'Admin' },
  { value: 'founder', label: 'Founder' },
  { value: 'investor', label: 'Investor' },
  { value: '-', label: '-' },
];

export interface TUser {
  email: string;
  name: string;
  role: UserRole;
  founder_id: number | null;
  founder: {
    id: number;
    name: string;
    startup_id: number;
    external_id: number;
  };
  investor_id: number | null;
  id: number;
}
