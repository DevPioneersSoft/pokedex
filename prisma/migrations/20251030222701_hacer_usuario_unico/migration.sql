/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");
