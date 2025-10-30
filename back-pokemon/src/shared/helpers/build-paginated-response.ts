import { PaginateResponseDto } from "../dto/paginate-response.dto";

export function buildPaginatedResponse<T>(
  params: { data: T[]; total: number; skip?: number; take?: number }
): PaginateResponseDto<T> {
  const { data, total, skip, take } = params;
  const limit = typeof take === "number" ? take : data.length;
  const page = limit ? Math.floor((skip ?? 0) / limit) + 1 : 1;
  const totalPages = limit ? Math.ceil(total / limit) : 1;
  const hasNextPage = limit ? ((skip ?? 0) + limit) < total : false;
  const hasPreviousPage = (skip ?? 0) > 0;
  return new PaginateResponseDto(
    data,
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPreviousPage
  );
}