export type UserRole = 'admin' | 'founder' | 'investor';

export enum userRoleId {
  ADMIN = 0,
  FOUNDER = 1,
  INVESTOR = 2,
  NONE = 3,
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
  founder_id: (number | null);
  investor_id: (number | null);
  id: number;
}
