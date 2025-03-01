/*
  Warnings:

  - Changed the type of `quantity` on the `items_on_orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "items_on_orders" DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL;
