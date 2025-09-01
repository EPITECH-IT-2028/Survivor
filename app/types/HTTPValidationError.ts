interface Items {
  loc: Array<(string | number)>
  msg: string 
  type: string
}

export interface HTTPValidationError {
  items: Array<Items>
}
