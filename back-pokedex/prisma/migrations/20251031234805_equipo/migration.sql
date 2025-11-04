-- CreateTable
CREATE TABLE "equipo" (
    "usuarioId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "shiny" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "equipo_pkey" PRIMARY KEY ("usuarioId","pokemonId")
);

-- AddForeignKey
ALTER TABLE "equipo" ADD CONSTRAINT "equipo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipo" ADD CONSTRAINT "equipo_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
