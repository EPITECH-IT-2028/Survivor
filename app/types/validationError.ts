export interface TValidationError {
  loc: (string | null)[];
  msg: string;
  type: string;
}
