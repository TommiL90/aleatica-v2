export interface DataResponse<T> {
  status: number
  result: T
  errorMessage?: any
}
