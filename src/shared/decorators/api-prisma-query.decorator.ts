import { ApiExtraModels, ApiQuery } from "@nestjs/swagger";
import { PrismaQueryParamsDto } from "../dto/prisma-query-params.dto";
import { applyDecorators } from "@nestjs/common";


export const ApiPrismaQuery = () =>
    applyDecorators(
        ApiExtraModels(PrismaQueryParamsDto),
        ApiQuery({ name: 'skip', required: false, type: Number, description: 'Omitir n elementos' }),
        ApiQuery({ name: 'take', required: false, type: Number, description: 'Devolver n elementos' }),
        ApiQuery({ name: 'cursor', required: false, type: String, description: 'Cursor JSON, ej: {"id":123}' }),
        ApiQuery({ name: 'orderBy', required: false, type: String, description: 'Orden JSON, ej: {"createdAt":"desc"}' }),
        ApiQuery({ name: 'where', required: false, type: String, description: 'Filtro JSON, ej: {"isActive":true}' }),
    );