-- CreateTable
CREATE TABLE "equipo" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "nombreEquipo" VARCHAR(255) NOT NULL,

    CONSTRAINT "equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_pokemon_equipo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_pokemon_equipo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_pokemon_equipo_B_index" ON "_pokemon_equipo"("B");

-- AddForeignKey
ALTER TABLE "equipo" ADD CONSTRAINT "equipo_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pokemon_equipo" ADD CONSTRAINT "_pokemon_equipo_A_fkey" FOREIGN KEY ("A") REFERENCES "equipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pokemon_equipo" ADD CONSTRAINT "_pokemon_equipo_B_fkey" FOREIGN KEY ("B") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
