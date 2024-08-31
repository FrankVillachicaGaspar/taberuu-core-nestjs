import { PaginationEnum } from '@shared/enums/pagination.enum';

export class PaginationError extends Error {
  readonly code: string = PaginationEnum.PAGINATION_ERROR;

  constructor(message: string) {
    super(message);
  }
}
