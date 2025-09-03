export interface TStartups {
  readonly id: number;
  name: string;
  legal_status: string | null;
  address: string | null;
  email: string;
  phone: string | null;
  sector: string | null;
  maturity: string | null;
}
