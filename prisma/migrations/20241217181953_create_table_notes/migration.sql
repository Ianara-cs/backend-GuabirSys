-- DropForeignKey
ALTER TABLE "items_on_orders" DROP CONSTRAINT "items_on_orders_order_id_fkey";

-- AlterTable
ALTER TABLE "items_on_orders" ADD COLUMN     "note_id" TEXT,
ALTER COLUMN "order_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "total" DECIMAL(8,2),

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "items_on_orders" ADD CONSTRAINT "items_on_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_on_orders" ADD CONSTRAINT "items_on_orders_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
