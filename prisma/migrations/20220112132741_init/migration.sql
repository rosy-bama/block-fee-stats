-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "average" DOUBLE PRECISION,
    "min" DOUBLE PRECISION,
    "max" DOUBLE PRECISION,
    "median" DOUBLE PRECISION,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);
