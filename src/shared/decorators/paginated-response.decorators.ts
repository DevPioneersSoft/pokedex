import { applyDecorators } from "@nestjs/common/decorators";
import { ApiExtraModels, ApiOkResponse } from "@nestjs/swagger/dist/decorators";
import { PaginacionResponseDto } from "../dto/paginacion-response.dto";
import { getSchemaPath } from "@nestjs/swagger";
import { Type } from "@nestjs/common";

export function ApiPaginatedResponse<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiExtraModels(PaginacionResponseDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginacionResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
}