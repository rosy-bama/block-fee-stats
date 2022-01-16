/*
  Warnings:

  - A unique constraint covering the columns `[level]` on the table `Block` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `level` to the `Block` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "block_id_seq";
ALTER TABLE "Block" ADD COLUMN     "level" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('block_id_seq');
ALTER SEQUENCE "block_id_seq" OWNED BY "Block"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Block_level_key" ON "Block"("level");
