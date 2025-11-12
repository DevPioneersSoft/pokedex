/*
  Warnings:

  - A unique constraint covering the columns `[id_usuario,numeroEquipo]` on the table `equipo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "equipo_id_usuario_numeroEquipo_key" ON "equipo"("id_usuario", "numeroEquipo");
