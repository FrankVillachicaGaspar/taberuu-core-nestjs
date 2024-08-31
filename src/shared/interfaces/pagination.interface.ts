export interface Pagination {
  total: number;
  records: number;
  limit: number;
  page: number;
  next: number | null;
  prev: number | null;
}
