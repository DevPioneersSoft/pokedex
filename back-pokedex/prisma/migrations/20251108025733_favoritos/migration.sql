-- CreateTable
CREATE TABLE "_favoritos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_favoritos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_favoritos_B_index" ON "_favoritos"("B");

-- AddForeignKey
ALTER TABLE "_favoritos" ADD CONSTRAINT "_favoritos_A_fkey" FOREIGN KEY ("A") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoritos" ADD CONSTRAINT "_favoritos_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
