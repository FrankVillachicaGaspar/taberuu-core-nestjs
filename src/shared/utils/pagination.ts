import { PaginationError } from '../errors/pagination.error';
import { Pagination } from '../interfaces/pagination.interface';

export default function pagination(
  limit: number,
  page: number,
  records: number,
): Pagination {
  if (page <= 0)
    throw new PaginationError(`The page must not be less than or equal to 0.`);

  const pages = Math.ceil(records / limit);

  if (page > pages && pages != 0)
    throw new PaginationError(`Page ${page} not found`);

  const next = page < pages ? page + 1 : null;

  const prev = page > 1 ? page - 1 : null;

  return {
    total: Math.max(pages, 1),
    limit,
    page,
    records,
    next,
    prev,
  };
}

export const calculateOffset = (limit: number, page: number) => {
  return (page - 1) * limit;
};
