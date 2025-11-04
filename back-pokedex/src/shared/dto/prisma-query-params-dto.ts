import { Transform, Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { SortOrder } from "generated/prisma/internal/prismaNamespace";
import tr from "zod/v4/locales/tr.js";

export class PrismaQueryParamsDto {
    @IsOptional()
    @Type(() => Number)
    take?: number;

    @IsOptional()   
    @Type(() => Number)
    skip?: number;

    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value === 'object') {
            return value;
        }
        try {
            return JSON.parse(value);
        } catch {
            return undefined;
        }
    })
    orderBy?: Record<string, any>;  

    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value === 'object') {
            return value;
        }
        try {
            return JSON.parse(value);
        } catch {
            return undefined;
        }
    })
    where?: Record<string, any>;
}