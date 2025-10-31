import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponseDto<T> {

    @ApiProperty({ description: "Datos paginados" })
    data: T[];

    @ApiProperty({ description: "Total de registros encontrados" })
    total: number;

    @ApiProperty({ description: "Página Actual" })
    page: number;

    @ApiProperty({ description: "Total de páginas" })
    totalPages: number;

    @ApiProperty({ description: "¿Hay página siguiente?" })
    hasNextPage: boolean;

    @ApiProperty({ description: "¿Hay página anterior?" })
    hasPreviousPage: boolean;
}