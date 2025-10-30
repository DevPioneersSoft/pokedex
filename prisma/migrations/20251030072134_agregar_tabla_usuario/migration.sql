-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "contrasena" VARCHAR(255) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);
