/*
  Warnings:

  - Added the required column `hash` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Made the column `average` on table `Block` required. This step will fail if there are existing NULL values in that column.
  - Made the column `min` on table `Block` required. This step will fail if there are existing NULL values in that column.
  - Made the column `max` on table `Block` required. This step will fail if there are existing NULL values in that column.
  - Made the column `median` on table `Block` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Block" ADD COLUMN     "hash" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "average" SET NOT NULL,
ALTER COLUMN "min" SET NOT NULL,
ALTER COLUMN "max" SET NOT NULL,
ALTER COLUMN "median" SET NOT NULL;
DROP SEQUENCE "Block_id_seq";
