import { TFounder } from "./fouder";

export interface TStartupDetail {
  id: number,
  name: string,
  legal_status: (string | null),
  address: (string | null),
  email: string,
  phone: (string | null),
  created_at: (string | null),
  description: (string | null),
  website_url: (string | null),
  social_media_url: (string | null),
  project_status: (string | null),
  needs: (string | null),
  sector: (string | null),
  maturity: (string | null),
  /// Need to put default empty array from founders
  founders: Array<TFounder>
}
