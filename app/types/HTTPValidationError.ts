export interface HTTPValidationItem {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  items: HTTPValidationItem[];
}
