-- CreateTable
CREATE TABLE "_equipo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_equipo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_equipo_B_index" ON "_equipo"("B");

-- AddForeignKey
ALTER TABLE "_equipo" ADD CONSTRAINT "_equipo_A_fkey" FOREIGN KEY ("A") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_equipo" ADD CONSTRAINT "_equipo_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
