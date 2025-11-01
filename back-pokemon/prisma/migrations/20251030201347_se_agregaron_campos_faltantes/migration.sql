/*
  Warnings:

  - Added the required column `defensa` to the `pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vida` to the `pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemon" ADD COLUMN     "defensa" INTEGER NOT NULL,
ADD COLUMN     "vida" INTEGER NOT NULL;
