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
  readonly id: number;
  email: string | null;
  founder_id: number | null;
  name: string;
  role: UserRole | null;
  investor_id: number | null;
  password: string | null;
  image: string | null;
  legacy_id: number | null;
}

export interface TUserMessage {
  id: number;
  name: string;
  email: string;
  image?: string;
}
