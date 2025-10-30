import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class PrismaQueryParamsDto {
	/**
	 * Número de elementos a omitir (para paginación).
	 * Ejemplo: 0
	 */
	@ApiPropertyOptional({ example: 0, description: 'Número de elementos a omitir (skip)' })
	@IsOptional()
	@Type(() => Number)
	skip?: number;

	/**
	 * Número máximo de elementos a devolver (para paginación).
	 * Ejemplo: 20
	 */
	@ApiPropertyOptional({ example: 20, description: 'Número máximo de elementos a devolver (take)' })
	@IsOptional()
	@Type(() => Number)
	take?: number;

	/**
	 * Parámetro de ordenamiento. Puede ser un objeto o un string JSON.
	 * Ejemplo: { "nombre": "asc" }
	 */
	@ApiPropertyOptional({
		example: { nombre: 'asc' },
		description: 'Parámetro de ordenamiento (orderBy), puede ser objeto o string JSON',
		type: 'object',
		additionalProperties: true,
	})
	
	@IsOptional()
	@Transform(({ value }) => {
		if (typeof value === 'object') return value;
		try {
			return JSON.parse(value);
		} catch {
			return undefined;
		}
	})
	orderBy?: Record<string, any>;

	@ApiPropertyOptional({
		example: { nombre: { contains: 'pika' } },
		description: 'Filtros de búsqueda (where), puede ser objeto o string JSON',
		type: 'object',
		additionalProperties: true,
	})
	@IsOptional()
	@Transform(({ value }) => {
		if (typeof value === 'object') return value;
		try {
			return JSON.parse(value);
		} catch {
			return undefined;
		}
	})
	where?: Record<string, any>;
}
