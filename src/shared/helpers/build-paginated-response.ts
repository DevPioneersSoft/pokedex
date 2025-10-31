import { PaginatedResponseDto } from "../dto/paginated-response.dto";


export function buildPaginatedResponse<T>({data, total, skip, take} : {data: T[],total:number, skip?:number, take?:number}): PaginatedResponseDto<T>{
    const page = take? Math.floor((skip ?? 0)/take) + 1 : 1;
    const totalPages = take ? Math.ceil(total/take) : 1;
    return {
        data, total, page, totalPages,
        hasNextPage : take ? (skip ?? 0) + take < total : false,
        hasPreviousPage : (skip ?? 0 ) > 0
    };
}