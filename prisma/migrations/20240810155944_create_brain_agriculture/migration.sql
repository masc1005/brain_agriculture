-- CreateTable
CREATE TABLE "BrainAgriculture" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "document" VARCHAR(14) NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "area_fazenda" INTEGER NOT NULL,
    "area_agricutaravel" INTEGER NOT NULL,
    "area_vegetacao" INTEGER NOT NULL,

    CONSTRAINT "BrainAgriculture_pkey" PRIMARY KEY ("id")
);
