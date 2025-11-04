-- CreateTable
CREATE TABLE "pokemon" (
    "id" INTEGER NOT NULL,
    "nombre" VARCHAR(250) NOT NULL,
    "descripcion" VARCHAR(500) NOT NULL,
    "types" VARCHAR(100) NOT NULL,
    "grunido" VARCHAR(100) NOT NULL,
    "imagen" VARCHAR(100) NOT NULL,
    "ataque" INTEGER,
    "defensa" INTEGER,
    "ataque_especial" INTEGER,
    "defensa_especial" INTEGER,
    "velocidad" INTEGER,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_pokemon" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,

    CONSTRAINT "tipo_pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PokemonTotipoPokemon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PokemonTotipoPokemon_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_pokemon_nombre_key" ON "tipo_pokemon"("nombre");

-- CreateIndex
CREATE INDEX "_PokemonTotipoPokemon_B_index" ON "_PokemonTotipoPokemon"("B");

-- AddForeignKey
ALTER TABLE "_PokemonTotipoPokemon" ADD CONSTRAINT "_PokemonTotipoPokemon_A_fkey" FOREIGN KEY ("A") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonTotipoPokemon" ADD CONSTRAINT "_PokemonTotipoPokemon_B_fkey" FOREIGN KEY ("B") REFERENCES "tipo_pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
