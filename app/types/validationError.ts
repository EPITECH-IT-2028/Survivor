export interface TValidationError {
  loc: Array<(string | null)>
  msg: string,
  type: string
}
