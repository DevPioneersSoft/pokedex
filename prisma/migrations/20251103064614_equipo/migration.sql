-- CreateTable
CREATE TABLE "equipo" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "numeroEquipo" INTEGER NOT NULL,

    CONSTRAINT "equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_equipo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_equipo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_usuario_equipos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_usuario_equipos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipo_nombre_key" ON "equipo"("nombre");

-- CreateIndex
CREATE INDEX "_equipo_B_index" ON "_equipo"("B");

-- CreateIndex
CREATE INDEX "_usuario_equipos_B_index" ON "_usuario_equipos"("B");

-- AddForeignKey
ALTER TABLE "_equipo" ADD CONSTRAINT "_equipo_A_fkey" FOREIGN KEY ("A") REFERENCES "equipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_equipo" ADD CONSTRAINT "_equipo_B_fkey" FOREIGN KEY ("B") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_usuario_equipos" ADD CONSTRAINT "_usuario_equipos_A_fkey" FOREIGN KEY ("A") REFERENCES "equipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_usuario_equipos" ADD CONSTRAINT "_usuario_equipos_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
