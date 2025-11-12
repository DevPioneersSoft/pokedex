/*
  Warnings:

  - You are about to drop the column `numeroEquipo` on the `equipo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."equipo_id_usuario_numeroEquipo_key";

-- AlterTable
ALTER TABLE "equipo" DROP COLUMN "numeroEquipo";
