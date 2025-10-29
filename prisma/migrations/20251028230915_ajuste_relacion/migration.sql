/*
  Warnings:

  - You are about to drop the column `tipo_pokemonId` on the `pokemon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."pokemon" DROP CONSTRAINT "pokemon_tipo_pokemonId_fkey";

-- AlterTable
ALTER TABLE "pokemon" DROP COLUMN "tipo_pokemonId";

-- CreateTable
CREATE TABLE "_pokemonTotipo_pokemon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_pokemonTotipo_pokemon_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_pokemonTotipo_pokemon_B_index" ON "_pokemonTotipo_pokemon"("B");

-- AddForeignKey
ALTER TABLE "_pokemonTotipo_pokemon" ADD CONSTRAINT "_pokemonTotipo_pokemon_A_fkey" FOREIGN KEY ("A") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pokemonTotipo_pokemon" ADD CONSTRAINT "_pokemonTotipo_pokemon_B_fkey" FOREIGN KEY ("B") REFERENCES "tipo_pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
