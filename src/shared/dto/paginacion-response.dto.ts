import { ApiProperty } from "@nestjs/swagger";

export class PaginacionResponseDto<T>{

    @ApiProperty({description:"datos paginados"})
    data: T[];

    @ApiProperty({description:"total de registros encontrados"})
    total: number;

    @ApiProperty({description:"pagina actual"})
    page: number;

    @ApiProperty({description:"total de paginas"})
    totalPages: number;

    @ApiProperty({description:"hay página siguiente?"})
    hasNextPage: boolean;

    @ApiProperty({description:"hay página previa?"})
    hasPreviousPage: boolean;

}