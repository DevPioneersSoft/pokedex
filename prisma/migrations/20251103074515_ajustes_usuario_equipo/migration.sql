/*
  Warnings:

  - You are about to drop the `_equipo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_usuario_equipos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_equipo" DROP CONSTRAINT "_equipo_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_equipo" DROP CONSTRAINT "_equipo_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_usuario_equipos" DROP CONSTRAINT "_usuario_equipos_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_usuario_equipos" DROP CONSTRAINT "_usuario_equipos_B_fkey";

-- DropTable
DROP TABLE "public"."_equipo";

-- DropTable
DROP TABLE "public"."_usuario_equipos";

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
