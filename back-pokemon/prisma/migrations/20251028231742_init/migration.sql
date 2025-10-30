-- CreateTable
CREATE TABLE "Pokemon" (
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
    "tipoPokemonId" INTEGER NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_pokemon" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "tipo_pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_numero_key" ON "Pokemon"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_nombre_key" ON "Pokemon"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_pokemon_nombre_key" ON "tipo_pokemon"("nombre");

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_tipoPokemonId_fkey" FOREIGN KEY ("tipoPokemonId") REFERENCES "tipo_pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
