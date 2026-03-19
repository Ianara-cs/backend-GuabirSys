/*
  Warnings:

  - Added the required column `updated_at` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('WAITING', 'PREPARATION', 'READY', 'DELIVERED', 'CANCELED');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "code" TEXT,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'WAITING',
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "waiter_id" TEXT;

-- Preenche registros antigos
UPDATE "orders"
SET "updated_at" = NOW()
WHERE "updated_at" IS NULL;

-- Agora pode tornar obrigatório
ALTER TABLE "orders"
ALTER COLUMN "updated_at" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_waiter_id_fkey" FOREIGN KEY ("waiter_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
