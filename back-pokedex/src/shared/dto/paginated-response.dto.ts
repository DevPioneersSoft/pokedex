import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponseDto<T>{

    @ApiProperty({description: "Datos Paginados"})
    data: T[];
    @ApiProperty({description: "Pagina Actual"})
    page: number;
    @ApiProperty({description: "Total de Registros"})
    total: number;
    @ApiProperty({description: "Total de Paginas"})
    totalPages: number;
    @ApiProperty({description: "Hay Pagina siguiente?"})
    hasNextPage: boolean;
    @ApiProperty({description: "Hay Pagina anterior?"})
    hasPreviousPage: boolean;
}