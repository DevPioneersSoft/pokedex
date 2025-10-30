/*
  Warnings:

  - You are about to drop the `Pokemon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PokemonTipo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipoPokemon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PokemonTipo" DROP CONSTRAINT "PokemonTipo_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PokemonTipo" DROP CONSTRAINT "PokemonTipo_tipoPokemonId_fkey";

-- DropTable
DROP TABLE "public"."Pokemon";

-- DropTable
DROP TABLE "public"."PokemonTipo";

-- DropTable
DROP TABLE "public"."tipoPokemon";

-- CreateTable
CREATE TABLE "pokemon" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "nombre" VARCHAR(250) NOT NULL,
    "descripcion" VARCHAR(250) NOT NULL,
    "grunido" VARCHAR(250) NOT NULL,
    "imagen" VARCHAR(250) NOT NULL,
    "ataque" INTEGER NOT NULL,
    "defensa" INTEGER NOT NULL,
    "ataque_especial" INTEGER NOT NULL,
    "defensa_especial" INTEGER NOT NULL,
    "velocidad" INTEGER NOT NULL,
    "altura" INTEGER NOT NULL,
    "peso" INTEGER NOT NULL,
    "sprite" VARCHAR(250) NOT NULL,
    "orden" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_pokemon" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "tipo_pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon_tipo" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "tipoPokemonId" INTEGER NOT NULL,

    CONSTRAINT "pokemon_tipo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_numero_key" ON "pokemon"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_nombre_key" ON "pokemon"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_pokemon_nombre_key" ON "tipo_pokemon"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_tipo_pokemonId_tipoPokemonId_key" ON "pokemon_tipo"("pokemonId", "tipoPokemonId");

-- AddForeignKey
ALTER TABLE "pokemon_tipo" ADD CONSTRAINT "pokemon_tipo_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_tipo" ADD CONSTRAINT "pokemon_tipo_tipoPokemonId_fkey" FOREIGN KEY ("tipoPokemonId") REFERENCES "tipo_pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
