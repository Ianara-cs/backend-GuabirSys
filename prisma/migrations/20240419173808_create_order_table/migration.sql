-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "price" DECIMAL(8,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items_on_orders" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "items_on_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "items_on_orders" ADD CONSTRAINT "items_on_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_on_orders" ADD CONSTRAINT "items_on_orders_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
