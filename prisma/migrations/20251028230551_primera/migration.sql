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
    "tipo_pokemonId" INTEGER,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_pokemon" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,

    CONSTRAINT "tipo_pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_pokemon_nombre_key" ON "tipo_pokemon"("nombre");

-- AddForeignKey
ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_tipo_pokemonId_fkey" FOREIGN KEY ("tipo_pokemonId") REFERENCES "tipo_pokemon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
