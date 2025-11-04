import { Injectable, Logger } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EquipoDto } from 'src/usuario/dto/equipo.dto';

@Injectable()
export class EquipoService {

    constructor(private prisma: PrismaService) { }
    private logger = new Logger(EquipoService.name);

    async actualizarEquipo(dto: EquipoDto): Promise<void> {
        const { pokemones, userId, nombreEquipo } = dto;
        this.logger.log(`actualizando favoritos para el usuario ${userId}: ${JSON.stringify(pokemones)}`)
        // 1️Buscar si el usuario ya tiene un equipo
        let equipo = await this.prisma.equipo.findFirst({
            where: { id_usuario: userId },
        });

        if (!equipo) {
            this.logger.warn(`No se encontró equipo para el usuario ${userId}, creando uno nuevo...`);
            equipo = await this.prisma.equipo.create({
                data: {
                    id_usuario: userId,
                    nombreEquipo: nombreEquipo,
                    pokemones: {
                        connect: pokemones.map((id) => ({ id }))
                    }
                }
            });
            this.logger.log(`✅ Equipo creado para usuario ${userId} con pokemones ${JSON.stringify(pokemones)}`);
            return;
        }
        // Si ya existe, actualizar su lista de pokemones
        await this.prisma.equipo.update({
            where: { id: equipo.id },
            data: {
                pokemones: {
                    set: pokemones.map((id) => ({ id })), // reemplaza los actuales
                },
            },
        });

        this.logger.log(`✅ Equipo actualizado para el usuario ${userId}`);
    }
}
