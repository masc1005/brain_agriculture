/*
  Warnings:

  - Added the required column `nome_fazenda` to the `BrainAgriculture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BrainAgriculture" ADD COLUMN     "nome_fazenda" TEXT NOT NULL;
