import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponseDto<T> {

    @ApiProperty({ isArray: true, description: 'Datos' })
    data: T[];

    @ApiProperty({ description: 'Total de elementos' })
    total: number; 
    
    @ApiProperty({ description: 'Página actual' })
    page: number;

    @ApiProperty({ description: 'Total de páginas' })
    totalPages: number;

    @ApiProperty({ description: '¿Hay una página siguiente?' })
    hasNextPage: boolean;

    @ApiProperty({ description: '¿Hay una página anterior?' })
    hasPreviousPage: boolean;
}
