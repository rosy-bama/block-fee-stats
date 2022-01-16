/*
  Warnings:

  - You are about to drop the `Block` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Block";

-- CreateTable
CREATE TABLE "block" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "average" DOUBLE PRECISION NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "block_level_key" ON "block"("level");
