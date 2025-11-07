/*
  Warnings:

  - You are about to drop the column `nombre` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `username` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE usuario_id_seq;
ALTER TABLE "usuario" DROP COLUMN "nombre",
ADD COLUMN     "username" VARCHAR(255) NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('usuario_id_seq');
ALTER SEQUENCE usuario_id_seq OWNED BY "usuario"."id";
