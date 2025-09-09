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
  email?: string;
  founder_id?: number;
  readonly id: number;
  investor_id?: number;
  legacy_id?: number;
  name: string;
  role: UserRole;
  password?: string;
}

export interface TUserMessage {
  id: number;
  name: string;
  email: string;
  image?: string;
}
