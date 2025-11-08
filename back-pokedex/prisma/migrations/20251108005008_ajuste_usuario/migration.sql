/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "contrasena" SET DATA TYPE TEXT,
ALTER COLUMN "username" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");
