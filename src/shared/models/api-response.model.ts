export interface ApiResponse<T, M> {
  data: T | null;
  meta?: M | null;
  code: number;
}
