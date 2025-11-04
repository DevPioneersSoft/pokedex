import { Injectable, Logger, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class PrismaErrorHandlerService {
  private readonly logger = new Logger(PrismaErrorHandlerService.name);

  /**
   * Maneja los errores de Prisma y los convierte en excepciones más amigables
   * @param error - El error capturado
   * @param context - Contexto del error para logging
   */
  handleError(error: any, context: string): never {
    this.logger.error(`${context}: ${error.message}`, error.stack);

    // Manejar errores conocidos de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handleKnownRequestError(error);
    }

    // Manejar errores de validación de Prisma
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new BadRequestException(
        `Datos inválidos proporcionados: ${error.message}`
      );
    }

    // Manejar errores de inicialización de Prisma
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new BadRequestException(
        `Error de conexión a la base de datos: ${error.message}`
      );
    }

    // Si el error ya es una excepción de NestJS, relanzarla
    if (error instanceof ConflictException || 
        error instanceof NotFoundException || 
        error instanceof BadRequestException) {
      throw error;
    }

    // Para otros errores desconocidos, relanzar
    throw error;
  }

  /**
   * Maneja los errores conocidos de Prisma basados en su código
   * @param error - Error de tipo PrismaClientKnownRequestError
   */
  private handleKnownRequestError(error: Prisma.PrismaClientKnownRequestError): never {
    switch (error.code) {
      case 'P2002':
        // Violación de constraint único
        throw new ConflictException(
          `Ya existe un registro con estos datos únicos. Campo: ${error.meta?.target || 'desconocido'}`
        );

      case 'P2025':
        // Registro no encontrado para operación
        throw new NotFoundException(
          `El registro solicitado no fue encontrado`
        );

      case 'P2003':
        // Violación de foreign key constraint
        throw new BadRequestException(
          `Relación inválida. Verifica que los datos relacionados existan. Campo: ${error.meta?.field_name || 'desconocido'}`
        );

      case 'P2014':
        // Violación de relación requerida
        throw new BadRequestException(
          `La relación requerida no puede ser eliminada`
        );

      case 'P2016':
        // Error de interpretación de query
        throw new BadRequestException(
          `Error en la consulta a la base de datos`
        );

      case 'P2021':
        // Tabla no existe
        throw new BadRequestException(
          `La tabla solicitada no existe en la base de datos`
        );

      case 'P2022':
        // Columna no existe
        throw new BadRequestException(
          `La columna solicitada no existe en la base de datos`
        );

      case 'P2023':
        // Datos inconsistentes
        throw new BadRequestException(
          `Los datos proporcionados son inconsistentes`
        );

      default:
        // Error desconocido de Prisma
        this.logger.error(`Error de Prisma no manejado: ${error.code}`, error.stack);
        throw new BadRequestException(
          `Error de base de datos [${error.code}]: ${error.message}`
        );
    }
  }
}
