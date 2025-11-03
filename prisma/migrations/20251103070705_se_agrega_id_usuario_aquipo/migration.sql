/*
  Warnings:

  - Added the required column `id_usuario` to the `equipo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipo" ADD COLUMN     "id_usuario" INTEGER NOT NULL;
