export interface TEvent {
  name: string;
  dates: Date | string | null;
  location: string | null;
  description: string | null;
  event_type: string | null;
  target_audience: string | null;
  readonly id: number;
}
