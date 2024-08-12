import { ReturnPaginationDto } from "../dto/pagination/pagination.dto";

export async function paginate(
  totalItems: number,
  page: number,
  pageSize: number
): Promise<ReturnPaginationDto> {
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  return {
    totalPages,
    currentPage,
  };
}
