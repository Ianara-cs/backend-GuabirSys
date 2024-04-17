-- CreateEnum
CREATE TYPE "TableStatus" AS ENUM ('RESERVED', 'BUSY', 'CLOSED');

-- CreateTable
CREATE TABLE "tables" (
    "id" TEXT NOT NULL,
    "number" INTEGER,
    "name_client" TEXT,
    "total_people" INTEGER,
    "table_status" "TableStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);
