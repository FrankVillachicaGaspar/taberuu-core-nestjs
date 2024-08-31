import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { PaginationEnum } from '@shared/enums/pagination.enum';

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => Number(value))
  limit: number = PaginationEnum.DEFAULT_PAGE_LIMIT;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Transform(({ value }) => Number(value))
  page: number;
}
