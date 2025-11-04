-- CreateTable
CREATE TABLE "equipo_pokemon" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "posicion" INTEGER NOT NULL,
    "es_lider" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipo_pokemon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipo_pokemon" ADD CONSTRAINT "equipo_pokemon_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipo_pokemon" ADD CONSTRAINT "equipo_pokemon_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
