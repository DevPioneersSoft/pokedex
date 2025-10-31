-- CreateTable
CREATE TABLE "pokemon" (
    "id" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "grunido" VARCHAR(255) NOT NULL,
    "imagen" VARCHAR(255) NOT NULL,
    "ataque" INTEGER NOT NULL,
    "defensa" INTEGER NOT NULL,
    "ataque_especial" INTEGER NOT NULL,
    "defensa_especial" INTEGER NOT NULL,
    "velocidad" INTEGER NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_pokemon" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,

    CONSTRAINT "tipo_pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_pokemonTotipo_pokemon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_pokemonTotipo_pokemon_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_pokemon_nombre_key" ON "tipo_pokemon"("nombre");

-- CreateIndex
CREATE INDEX "_pokemonTotipo_pokemon_B_index" ON "_pokemonTotipo_pokemon"("B");

-- AddForeignKey
ALTER TABLE "_pokemonTotipo_pokemon" ADD CONSTRAINT "_pokemonTotipo_pokemon_A_fkey" FOREIGN KEY ("A") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pokemonTotipo_pokemon" ADD CONSTRAINT "_pokemonTotipo_pokemon_B_fkey" FOREIGN KEY ("B") REFERENCES "tipo_pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
