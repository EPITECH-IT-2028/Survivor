export type UserRole = 'admin' | 'founder' | 'investor' | 'member';

export interface TUser {
  email: string;
  name: string;
  role: UserRole;
  founder_id: (number | null);
  investor_id: (number | null);
  id: number;
}
