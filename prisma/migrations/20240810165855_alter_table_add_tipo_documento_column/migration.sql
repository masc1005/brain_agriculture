/*
  Warnings:

  - You are about to drop the column `document` on the `BrainAgriculture` table. All the data in the column will be lost.
  - Added the required column `documento` to the `BrainAgriculture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_documento` to the `BrainAgriculture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BrainAgriculture" DROP COLUMN "document",
ADD COLUMN     "documento" VARCHAR(14) NOT NULL,
ADD COLUMN     "tipo_documento" VARCHAR(4) NOT NULL;
