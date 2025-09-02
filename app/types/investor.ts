export interface TInvestor {
  name: string;
  legal_status: string | null;
  address: string | null;
  email: string;
  phone: string | null;
  created_at: string | null;
  description: string | null;
  investor_type: string | null;
  investment_focus: string | null;
  id: number;
}
