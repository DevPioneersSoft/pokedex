import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponseDto<T>{
    
    @ApiProperty({description: 'Datos paginados'})
    data: T[];

    @ApiProperty({description: 'Total de registros encontrados'})
    total: number;

    @ApiProperty({description: 'Pagina actual'})
    page: number;

    @ApiProperty({description: 'Total de paginas'})
    totalPages: number;

    @ApiProperty({description: 'Hay pagina siguiente?'})
    hasNextPage: boolean;

    @ApiProperty({description: 'Hay pagina anterior?'})
    hasPreviousPage: boolean;
    
}