-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "contrasena" VARCHAR(255) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");
