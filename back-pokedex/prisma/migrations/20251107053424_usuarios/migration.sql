-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "contrasena" VARCHAR(9) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);
