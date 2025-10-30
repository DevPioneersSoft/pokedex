/*
  Warnings:

  - You are about to drop the column `tipoPokemonId` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the `tipo_pokemon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Pokemon" DROP CONSTRAINT "Pokemon_tipoPokemonId_fkey";

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "tipoPokemonId";

-- DropTable
DROP TABLE "public"."tipo_pokemon";

-- CreateTable
CREATE TABLE "tipoPokemon" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "tipoPokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonTipo" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "tipoPokemonId" INTEGER NOT NULL,

    CONSTRAINT "PokemonTipo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipoPokemon_nombre_key" ON "tipoPokemon"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonTipo_pokemonId_tipoPokemonId_key" ON "PokemonTipo"("pokemonId", "tipoPokemonId");

-- AddForeignKey
ALTER TABLE "PokemonTipo" ADD CONSTRAINT "PokemonTipo_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonTipo" ADD CONSTRAINT "PokemonTipo_tipoPokemonId_fkey" FOREIGN KEY ("tipoPokemonId") REFERENCES "tipoPokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
